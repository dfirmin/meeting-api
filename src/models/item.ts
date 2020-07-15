export default interface Item {
  id: string;
  description: string;
  priority: number;
  dateCompleted: Date | null;
  userId: number;
  meetingSeriesId: number;
  sectionId: number;
  dateArchived: Date | null;
  isActive: boolean;
}