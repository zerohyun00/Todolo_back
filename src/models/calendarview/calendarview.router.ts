import { Router } from 'express';
import CalendarViewController from './calendarview.controller';

const CalendarViewRouter = Router();

//생성
CalendarViewRouter.post('/', CalendarViewController.createCalendarView);

export default CalendarViewRouter;
