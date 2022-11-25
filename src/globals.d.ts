export interface Day {
    year:number;
    month:number;
    day:number;
    dayOfWeek:number;
    dayOfWeekKanji:string;
    timestamp:number;
}


export interface ServerData {
    userId: number;
    title: string;
    artist: string;
    duration_ms: number | null;
    track_image: string | null;
    bpm: number | null;
    main_key: string | null;
    date: string | null;
    location: string | null;
    url: string | null;
    comment: string | null;
  };
