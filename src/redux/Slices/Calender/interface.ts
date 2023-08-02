export interface CalenderRequestDto {
    title: string;
    description?: string;
    instant?: boolean;
    custom_date?: Date | null;
    notification_alert_type?: string;
    notification_alert_time?: number;
    cancelled?: boolean;
    id?:number
  }
  