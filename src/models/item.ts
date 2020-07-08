export default interface Item {
  id: number;
  description: string;
  priority: number;
  dateCompleted: boolean;
  userId: number;
  meetingSeriesId: number;
  sectionId: number;
  dateArchived: Date;
  isActive: boolean;
}