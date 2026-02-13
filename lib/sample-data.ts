import type { PositionInput } from "./types";

export const samplePositions: PositionInput[] = [
  {
    protocol: "Kamino",
    collateralUsd: 24500,
    debtUsd: 13200,
    liquidationThreshold: 0.83
  },
  {
    protocol: "MarginFi",
    collateralUsd: 8800,
    debtUsd: 6900,
    liquidationThreshold: 0.8
  },
  {
    protocol: "Solend",
    collateralUsd: 5100,
    debtUsd: 4300,
    liquidationThreshold: 0.78
  }
];
