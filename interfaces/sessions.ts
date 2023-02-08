export interface Session {
  venue: string;
  timeSlots: {
    date: string;
    title: string;
    thumbnail: string;
    startTime: string;
    endTime: string;
    category: string;
    location: string;
  }[];
  sequence: number;
  isDisabled: boolean;
}
