export class Token {
  token?: string;
  firstName?: string;
  validity?: {
    days?: number;
    hours?: number;
    milliseconds?: number;
    minutes?: number;
    seconds?: number;
    ticks?: number;
    totalDays?: number;
    totalHours?: number;
    totalMilliseconds?: number;
    totalMinutes?: number;
    totalSeconds?: number;
  };
  email?: string;
  guids?: string;
}
