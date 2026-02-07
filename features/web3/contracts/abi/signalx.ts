export const SIGNALX_ABI = [
    {
        type: 'constructor',
        inputs: [
            {
                name: 'adminAddress',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'tokenAddress',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'receive',
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'MAX_FEE_PERCENTAGE',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'addOperator',
        inputs: [
            {
                name: 'operator',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'calculatePotentialPayout',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'direction',
                type: 'uint8',
                internalType: 'enum Types.Direction',
            },
        ],
        outputs: [
            {
                name: 'potentialPayout',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'currentMultiplier',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'changePauser',
        inputs: [
            {
                name: 'newPauser',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'createRound',
        inputs: [
            {
                name: 'newRound',
                type: 'tuple',
                internalType: 'struct Types.NewRound',
                components: [
                    {
                        name: 'minBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'maxBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betsLimit',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'endRound',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'endPrice',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'batchSize',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'feePercentage',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getActiveBetsForUser',
        inputs: [
            {
                name: 'user',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.BetView[]',
                components: [
                    {
                        name: 'tradeIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'user',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'direction',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'sold',
                        type: 'bool',
                        internalType: 'bool',
                    },
                    {
                        name: 'sellAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'entryMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'currentMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'currentValue',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getActiveBetsForUserInRound',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'user',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.BetView[]',
                components: [
                    {
                        name: 'tradeIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'user',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'direction',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'sold',
                        type: 'bool',
                        internalType: 'bool',
                    },
                    {
                        name: 'sellAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'entryMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'currentMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'currentValue',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getBet',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'betIndex',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple',
                internalType: 'struct Types.Bet',
                components: [
                    {
                        name: 'user',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'tradeIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'direction',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'sold',
                        type: 'bool',
                        internalType: 'bool',
                    },
                    {
                        name: 'sellAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'entryMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getConfiguration',
        inputs: [],
        outputs: [
            {
                name: 'tokenAddress',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'feePercent',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'sellFeePercent',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'maxFeePercent',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getCurrentRound',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'tuple',
                internalType: 'struct Types.Round',
                components: [
                    {
                        name: 'round',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'startPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'minBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'maxBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'upPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'downPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'result',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'startTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'distributedCount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalDistributed',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betsLimit',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'created',
                        type: 'bool',
                        internalType: 'bool',
                    },
                    {
                        name: 'createdAt',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getCurrentRoundId',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getDistributionStatus',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'isComplete',
                type: 'bool',
                internalType: 'bool',
            },
            {
                name: 'distributedCount',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'totalBets',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'totalDistributed',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getLeaderboard',
        inputs: [
            {
                name: 'limit',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.UserStats[]',
                components: [
                    {
                        name: 'user',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'totalBets',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalWins',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalAmountBet',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalAmountWon',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'exists',
                        type: 'bool',
                        internalType: 'bool',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getPendingDistribution',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getPendingResultRounds',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.Round[]',
                components: [
                    {
                        name: 'round',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'startPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'minBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'maxBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'upPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'downPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'result',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'startTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'distributedCount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalDistributed',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betsLimit',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'created',
                        type: 'bool',
                        internalType: 'bool',
                    },
                    {
                        name: 'createdAt',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getResult',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint8',
                internalType: 'enum Types.Direction',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRound',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple',
                internalType: 'struct Types.Round',
                components: [
                    {
                        name: 'round',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'startPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'minBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'maxBetAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'upPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'downPool',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'result',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'startTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'distributedCount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalDistributed',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betsLimit',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'created',
                        type: 'bool',
                        internalType: 'bool',
                    },
                    {
                        name: 'createdAt',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRoundBetCount',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRoundBets',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.Bet[]',
                components: [
                    {
                        name: 'user',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'tradeIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'direction',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'sold',
                        type: 'bool',
                        internalType: 'bool',
                    },
                    {
                        name: 'sellAmount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'entryMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getRoundPools',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'totalPool',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'upPool',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'downPool',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'upMultiplier',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'downMultiplier',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getTotalUsers',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getUserActiveTrades',
        inputs: [
            {
                name: 'user',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.TradeHistoryView[]',
                components: [
                    {
                        name: 'roundId',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'direction',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'result',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'entryMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'timestamp',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'status',
                        type: 'uint8',
                        internalType: 'enum Types.TradeStatus',
                    },
                    {
                        name: 'payout',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'startPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getUserStats',
        inputs: [
            {
                name: 'user',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple',
                internalType: 'struct Types.UserStats',
                components: [
                    {
                        name: 'user',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'totalBets',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalWins',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalAmountBet',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'totalAmountWon',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'exists',
                        type: 'bool',
                        internalType: 'bool',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getUserTradeCount',
        inputs: [
            {
                name: 'user',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getUserTradeHistory',
        inputs: [
            {
                name: 'user',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'offset',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'limit',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.TradeHistoryView[]',
                components: [
                    {
                        name: 'roundId',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'direction',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'result',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'entryMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'timestamp',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'status',
                        type: 'uint8',
                        internalType: 'enum Types.TradeStatus',
                    },
                    {
                        name: 'payout',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'startPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getUserTradesByRound',
        inputs: [
            {
                name: 'user',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                internalType: 'struct Types.TradeHistoryView[]',
                components: [
                    {
                        name: 'roundId',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'direction',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'result',
                        type: 'uint8',
                        internalType: 'enum Types.Direction',
                    },
                    {
                        name: 'entryMultiplier',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'timestamp',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'betIndex',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'status',
                        type: 'uint8',
                        internalType: 'enum Types.TradeStatus',
                    },
                    {
                        name: 'payout',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'startPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'isDistributionComplete',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'isOperator',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'owner',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'pause',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'paused',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'pauser',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'placeBet',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'direction',
                type: 'uint8',
                internalType: 'enum Types.Direction',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'removeOperator',
        inputs: [
            {
                name: 'operator',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'renounceOwnership',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'sellFeePercentage',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'sellPosition',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'betIndex',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setFeePercentage',
        inputs: [
            {
                name: 'newFeePercentage',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setSellFeePercentage',
        inputs: [
            {
                name: 'newSellFeePercentage',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setTokenAddress',
        inputs: [
            {
                name: 'tokenAddress',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'startRound',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'params',
                type: 'tuple',
                internalType: 'struct Types.RoundStartParams',
                components: [
                    {
                        name: 'startPrice',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'startTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'endTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'token',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IERC20',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'transferOwnership',
        inputs: [
            {
                name: 'newOwner',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'unpause',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'withdrawETH',
        inputs: [
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'to',
                type: 'address',
                internalType: 'address payable',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'withdrawToken',
        inputs: [
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'to',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'event',
        name: 'BatchDistributed',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                indexed: true,
                internalType: 'uint256',
            },
            {
                name: 'startIndex',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'endIndex',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'totalAmount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'recipientCount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'isRefund',
                type: 'bool',
                indexed: false,
                internalType: 'bool',
            },
            {
                name: 'timestamp',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'BetPlaced',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                indexed: true,
                internalType: 'uint256',
            },
            {
                name: 'user',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'direction',
                type: 'uint8',
                indexed: false,
                internalType: 'enum Types.Direction',
            },
            {
                name: 'entryMultiplier',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'timestamp',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'BetSold',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                indexed: true,
                internalType: 'uint256',
            },
            {
                name: 'user',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'betIndex',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'originalAmount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'sellAmount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'entryMultiplier',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'currentMultiplier',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'timestamp',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'FeeCollected',
        inputs: [
            {
                name: 'roundId',
                type: 'uint256',
                indexed: true,
                internalType: 'uint256',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'timestamp',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'OperatorAdded',
        inputs: [
            {
                name: 'operator',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'OperatorRemoved',
        inputs: [
            {
                name: 'operator',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'OwnershipTransferred',
        inputs: [
            {
                name: 'previousOwner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'newOwner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Paused',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: false,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'PauserChanged',
        inputs: [
            {
                name: 'previousPauser',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'newPauser',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'RoundCreated',
        inputs: [
            {
                name: 'round',
                type: 'uint256',
                indexed: true,
                internalType: 'uint256',
            },
            {
                name: 'timestamp',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'RoundEnded',
        inputs: [
            {
                name: 'round',
                type: 'uint256',
                indexed: true,
                internalType: 'uint256',
            },
            {
                name: 'endPrice',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'result',
                type: 'uint8',
                indexed: false,
                internalType: 'enum Types.Direction',
            },
            {
                name: 'timestamp',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'RoundStarted',
        inputs: [
            {
                name: 'round',
                type: 'uint256',
                indexed: true,
                internalType: 'uint256',
            },
            {
                name: 'startPrice',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'startTime',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'endTime',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'timestamp',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Unpaused',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: false,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'error',
        name: 'EnforcedPause',
        inputs: [],
    },
    {
        type: 'error',
        name: 'ExpectedPause',
        inputs: [],
    },
    {
        type: 'error',
        name: 'OwnableInvalidOwner',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'OwnableUnauthorizedAccount',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'SafeERC20FailedOperation',
        inputs: [
            {
                name: 'token',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
] as const;
