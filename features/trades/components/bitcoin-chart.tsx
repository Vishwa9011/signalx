'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, LinearScale, PointElement, TimeScale, Filler, Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { bitcoinStore } from '@/features/market/store/bitcoinStore';
import { useBitcoinData } from '@/features/market/hooks/useBitcoinData';
import BitcoinChartSkelton from '@/components/shared/loading/BitcoinChartSkelton';
import { useRoundStore } from '@/features/market/store/roundStore';
import usePageVisibility from '@/features/trades/hooks/usePageVisibility';

ChartJS.register(LineElement, LinearScale, PointElement, TimeScale, Filler);

type PricePoint = {
    x: number; // timestamp (ms)
    y: number; // price (USD)
};

const BitcoinChart = () => {
    const { queryLoading } = useBitcoinData();
    const isTransitioning = bitcoinStore(s => s.isTransitioning);
    const { startPrice, endPrice } = useRoundStore(s => s.round);
    const isPageVisible = usePageVisibility();
    // console.log('round result', result);
    // console.log('BitcoinChart render - startPrice:', startPrice);
    // console.log('BitcoinChart render - createdAt:', createdAt);

    const points = bitcoinStore(state => state.points);
    const chartRef = useRef<Chart<'line'>>(null);
    const baselinePriceRef = useRef<number | null>(null);
    // console.log('points length:', points);

    // Reload chart when startPrice or endPrice changes, or when page becomes visible
    useEffect(() => {
        if (chartRef.current && startPrice > 0) {
            chartRef.current.update('none'); // Soft update for baseline
        }
        if (chartRef.current && endPrice > 0) {
            chartRef.current.update('none'); // Soft update for vertical line only
        }
        if (chartRef.current && isPageVisible) {
            chartRef.current.update('default'); // Force update when returning to page
        }
    }, [startPrice, endPrice, isPageVisible]);

    // console.log('BitcoinChart render - points length:', points);

    // Filter points based on startPrice - if startPrice is set, only show data from that point onwards
    const filteredPoints = useMemo(() => {
        if (startPrice && startPrice > 0 && points.length > 0) {
            // Keep only the first point (representing startPrice) and all subsequent points
            return points;
        }
        return points;
    }, [points, startPrice]);

    // Calculate x-axis range with a rolling window approach
    // Keep a fixed time window and position the latest point at 85% of the chart width
    const now = filteredPoints.length > 0 ? filteredPoints[filteredPoints.length - 1].x : Date.now();
    const firstPointTime = filteredPoints.length > 0 ? filteredPoints[0].x : Date.now();
    const dataTimeSpan = now - firstPointTime;
    const windowDuration = 5 * 60 * 1000; // 5 minute window in milliseconds

    // If data span is less than window duration, show from start (left to right growth)
    // Otherwise use rolling window (auto-pan)
    const startDate = dataTimeSpan < windowDuration ? firstPointTime : now - windowDuration;
    const endDate = dataTimeSpan < windowDuration ? firstPointTime + windowDuration : now + windowDuration * 0.15; // Add 15% padding on the right

    const last = filteredPoints[filteredPoints.length - 1];

    // Lock baseline once set - should NEVER change even when round ends
    // This prevents the graph from shifting up/down when endPrice is recorded
    if (startPrice && startPrice > 0 && !baselinePriceRef.current) {
        // Only set baseline once when startPrice is first available
        baselinePriceRef.current = startPrice;
    } else if (!startPrice || startPrice === 0) {
        // Reset baseline when new round starts (no startPrice yet)
        baselinePriceRef.current = null;
    }

    // Use the locked baseline price
    const baselinePrice = baselinePriceRef.current;
    // console.log('BitcoinChart render - baselinePrice:', baselinePrice);

    // If baseline is not set, use blue color; otherwise use red/green based on price comparison
    const isUp = last && baselinePrice && last.y >= baselinePrice;
    const lineColor = !baselinePrice ? '#3B82F6' : isUp ? '#22C55E' : '#EF4444';
    const showBaseline = baselinePrice && baselinePrice > 0;

    // 🧮 Calculate Y range based on baselinePrice and visible points only
    const { yMin, yMax } = useMemo(() => {
        // Filter to only visible points in the current window
        const visiblePoints = filteredPoints.filter(p => p.x >= startDate && p.x <= endDate);

        // If no baseline is set, calculate range based on visible data points
        if (!baselinePrice || baselinePrice <= 0) {
            if (visiblePoints.length === 0) return { yMin: undefined, yMax: undefined };

            const prices = visiblePoints.map(p => p.y);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const priceRange = maxPrice - minPrice;
            const padding = priceRange * 0.15; // 15% padding

            return {
                yMin: minPrice - padding,
                yMax: maxPrice + padding,
            };
        }

        // Calculate the maximum deviation from baselinePrice using only visible points
        const maxDev =
            visiblePoints.length > 0
                ? visiblePoints.reduce((m, p) => Math.max(m, Math.abs(p.y - baselinePrice)), 0)
                : 0;

        // When startPrice is set, ensure the baseline is centered (middle of chart)
        // Use symmetric padding above and below the baseline
        const minPadding = baselinePrice * 0.001; // 0.1% of baselinePrice as minimum padding
        const dynamicPadding = maxDev * 0.15; // 15% extra padding above max deviation
        const padding = Math.max(minPadding, dynamicPadding);

        // Calculate span with minimum size to ensure baseline visibility
        const minSpan = baselinePrice * 0.002; // Minimum 0.2% span
        const calculatedSpan = Math.max(maxDev + padding, minSpan);

        // If startPrice is set, use symmetric range to center the baseline
        if (startPrice && startPrice > 0) {
            return {
                yMin: baselinePrice - calculatedSpan,
                yMax: baselinePrice + calculatedSpan,
            };
        }

        return {
            yMin: baselinePrice - calculatedSpan,
            yMax: baselinePrice + calculatedSpan,
        };
    }, [filteredPoints, baselinePrice, startDate, endDate, startPrice]);

    // 📊 Chart data
    const data = useMemo(
        () => ({
            datasets: [
                {
                    label: 'BTC',
                    data: filteredPoints,
                    parsing: false,
                    borderColor: lineColor,
                    borderWidth: 2,
                    tension: 0.35,
                    pointRadius: (ctx: { dataIndex: number }) => (ctx.dataIndex === filteredPoints.length - 1 ? 4 : 0),
                    pointBackgroundColor: lineColor,
                },
                // Only show baseline when startPrice is set
                showBaseline && filteredPoints.length > 0
                    ? {
                          label: 'Baseline',
                          data: [
                              { x: startDate, y: baselinePrice },
                              { x: endDate, y: baselinePrice },
                          ],
                          borderColor: '#000',
                          borderDash: [4, 4],
                          borderWidth: 1,
                          pointRadius: 0,
                      }
                    : null,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ].filter(Boolean) as any,
        }),
        [filteredPoints, lineColor, showBaseline, baselinePrice, startDate, endDate],
    );

    // 🧩 Custom plugin to draw and animate price bubble + baseline label
    const labelPlugin = {
        id: 'labelPlugin',
        startTime: Date.now(), // for breathing
        pulseStart: Date.now(), // for radar pulse timing

        afterDraw(chart: Chart<'line'>) {
            const dataset = chart.data.datasets[0];
            if (!dataset || !dataset.data.length) return;

            const lastPoint = dataset.data[dataset.data.length - 1] as PricePoint;
            // Get startPrice from the baseline dataset (second dataset)
            const baselineDataset = chart.data.datasets[1];
            const currentStartPrice = (baselineDataset?.data as PricePoint[])?.[0]?.y;

            // If no baseline, use blue color; otherwise use red/green
            const hasBaseline = currentStartPrice && currentStartPrice > 0;
            const isUp = hasBaseline && lastPoint.y >= currentStartPrice;
            const lineColor = !hasBaseline ? '#3B82F6' : isUp ? '#22C55E' : '#EF4444';

            const { ctx, scales } = chart;
            const x = scales.x.getPixelForValue(lastPoint.x);
            const y = scales.y.getPixelForValue(lastPoint.y);

            ctx.save();

            // --- Baseline label --- (only draw if baseline exists)
            if (hasBaseline) {
                const baseY = scales.y.getPixelForValue(currentStartPrice);

                ctx.font = '600 12px system-ui, -apple-system, Segoe UI';
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.textAlign = 'center';

                // Add background for better visibility
                const labelText = 'BASELINE';
                const labelWidth = ctx.measureText(labelText).width;
                const labelX = (scales.x.left + scales.x.right) / 2;
                const labelY = baseY - 6;

                // Draw background rectangle
                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.fillRect(labelX - labelWidth / 2 - 4, labelY - 12, labelWidth + 8, 16);

                // Draw text
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillText(labelText, labelX, labelY);
            }

            // --- 💫 Breathing Animation ---
            const now = Date.now();
            const time = (now - this.startTime) / 1000;
            const breath = (Math.sin(time * Math.PI * 2) + 1) / 2;
            const eased = 0.5 - Math.cos(breath * Math.PI) / 2;

            const outerRadius = 8 + 5 * eased; // glow
            const mainRadius = 6 * (1 - eased); // shrinks to 0
            const alpha = 1 - eased; // fades out

            // --- 🌕 Outer Glow ---
            ctx.beginPath();
            ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
            ctx.fillStyle = `${lineColor}22`;
            ctx.fill();

            // --- 🔵 Main Dot (shrink + fade) ---
            if (mainRadius > 0.1) {
                ctx.beginPath();
                ctx.arc(x, y, mainRadius, 0, Math.PI * 2);
                const r = parseInt(lineColor.slice(1, 3), 16);
                const g = parseInt(lineColor.slice(3, 5), 16);
                const b = parseInt(lineColor.slice(5, 7), 16);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fill();
            }

            // --- 🫧 Radar Pulse Ring ---
            const pulseDuration = 2500; // ms per pulse
            const pulseElapsed = (now - this.pulseStart) % pulseDuration;
            const pulseProgress = pulseElapsed / pulseDuration; // 0 → 1

            const pulseRadius = 10 + pulseProgress * 40; // expands outward
            const pulseOpacity = 1 - pulseProgress; // fades out
            if (pulseOpacity > 0.05) {
                ctx.beginPath();
                ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
                const r = parseInt(lineColor.slice(1, 3), 16);
                const g = parseInt(lineColor.slice(3, 5), 16);
                const b = parseInt(lineColor.slice(5, 7), 16);
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pulseOpacity * 0.4})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // --- 💰 Price Label Bubble ---
            const priceText = lastPoint.y.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
            });
            // Only show arrow when baseline is set
            const arrow = hasBaseline ? (isUp ? '↑' : '↓') : '';
            const label = arrow ? `${arrow} ${priceText}` : priceText;

            ctx.font = '600 13px system-ui, -apple-system, Segoe UI';
            const padX = 12;
            const textW = ctx.measureText(label).width;
            const w = textW + padX * 2;
            const h = 28;
            const rCorner = 14;

            // Smart label positioning
            let bx = x + 14;
            if (bx + w + 8 > chart.chartArea.right) bx = x - w - 14;
            bx = Math.max(chart.chartArea.left + 8, bx);

            const by = Math.max(chart.chartArea.top + 8, Math.min(y - h / 2, chart.chartArea.bottom - h - 8));

            ctx.fillStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(bx + rCorner, by);
            ctx.lineTo(bx + w - rCorner, by);
            ctx.quadraticCurveTo(bx + w, by, bx + w, by + rCorner);
            ctx.lineTo(bx + w, by + h - rCorner);
            ctx.quadraticCurveTo(bx + w, by + h, bx + w - rCorner, by + h);
            ctx.lineTo(bx + rCorner, by + h);
            ctx.quadraticCurveTo(bx, by + h, bx, by + h - rCorner);
            ctx.lineTo(bx, by + rCorner);
            ctx.quadraticCurveTo(bx, by, bx + rCorner, by);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.fillText(label, bx + padX, by + 18);

            ctx.restore();

            // --- 🔁 Continuous animation ---
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const c = chart as any;
            if (!c.$animating) {
                c.$animating = true;
                const animate = () => {
                    if (!c || !c.ctx || !c.ctx.canvas || !c.ctx.canvas.isConnected) {
                        c.$animating = false;
                        return;
                    }
                    c.draw();
                    requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        },
    };

    const verticalLinesPlugin = {
        id: 'verticalLinesPlugin',

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeDraw(chart: { ctx: any; chartArea: any; scales: any }) {
            const { ctx, chartArea, scales } = chart;
            if (!chartArea) return;

            const xScale = scales.x;

            // Values coming from your RoundStore
            const round = useRoundStore.getState().round;
            const startTime = round.startTime;
            const endPrice = round.endPrice;

            // We also need timestamps where these happened
            // You already store BTC price history in `points`
            const points = bitcoinStore.getState().points;

            if (!points || points.length === 0) return;

            const findTimestampForPrice = (price: number) => {
                if (!price || price <= 0 || !points || points.length === 0) return null;

                let closest = points[0];
                let minDiff = Math.abs(points[0].y - price);

                for (let i = points.length - 1; i >= 0; i--) {
                    const diff = Math.abs(points[i].y - price);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closest = points[i];
                    }
                }

                return closest?.x ?? null;
            };

            const startXValue = startTime;
            const endXValue = findTimestampForPrice(endPrice);

            ctx.save();
            ctx.lineWidth = 1.5;

            // Draw vertical line at startPrice
            if (startXValue) {
                const x = xScale.getPixelForValue(startXValue);
                ctx.strokeStyle = '#0EA5E9'; // blue line
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(x, chartArea.top);
                ctx.lineTo(x, chartArea.bottom);
                ctx.stroke();

                ctx.setLineDash([]);
                ctx.fillStyle = '#0EA5E9';
                ctx.font = '600 12px system-ui';
                ctx.textAlign = 'center';
                ctx.background = '#000';
                ctx.fillText(`START PRICE`, x, chartArea.top + 12);
            }

            // Draw vertical line at endPrice
            if (startXValue && endXValue && endXValue > startXValue) {
                const x = xScale.getPixelForValue(endXValue);
                ctx.strokeStyle = '#10B981';
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(x, chartArea.top);
                ctx.lineTo(x, chartArea.bottom);
                ctx.stroke();

                ctx.setLineDash([]);
                ctx.fillStyle = '#10B981';
                ctx.font = '600 12px system-ui';
                ctx.textAlign = 'center';
                ctx.fillText(`ROUND END`, x, chartArea.bottom - 10);
            }

            ctx.restore();
        },
    };

    const options = {
        responsive: true,
        animation: false as const,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            x: {
                type: 'time' as const,
                min: startDate,
                max: endDate,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                afterBuildTicks(scale: any) {
                    // Force only first and last tick
                    return (scale.ticks = [
                        {
                            value: scale.min,
                        },
                        {
                            value: scale.max,
                        },
                    ]);
                },
                grid: {
                    drawBorder: false,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    color: (context: any) => {
                        const { index, scale } = context;
                        return index === 0 || index === scale.ticks.length - 1 ? '#000' : 'transparent';
                    },
                },
                ticks: {
                    display: false, // Hide time ticks
                    color: '#9CA3AF',
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
            y: {
                min: yMin,
                max: yMax,
                grid: { display: false, drawBorder: false },
                ticks: { display: false },
            },
        },
    };

    // Only render chart when we have points
    if (!filteredPoints || filteredPoints.length === 0) {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="w-full text-sm font-medium text-gray-500">
                    Loading chart data…
                    <BitcoinChartSkelton />
                </div>
            </div>
        );
    }

    if (queryLoading || isTransitioning) {
        return <BitcoinChartSkelton />;
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#fff',
            }}
        >
            <Line
                ref={chartRef}
                data={data}
                options={{
                    ...options,
                    maintainAspectRatio: false,
                }}
                height={360}
                plugins={[labelPlugin, verticalLinesPlugin]}
            />
        </div>
    );
};

export default BitcoinChart;
