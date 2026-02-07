import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const days = [];
    // Previous month padding
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>);
    }

    // Current month days
    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
        days.push(
            <div
                key={d}
                className={`h-9 w-9 flex items-center justify-center rounded-md text-sm transition-colors cursor-default
                    ${isToday
                        ? 'bg-primary text-background font-bold'
                        : 'text-primary hover:bg-surface dark:hover:bg-white/10'
                    }`}
            >
                {d}
            </div>
        );
    }

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="p-4 rounded-2xl bg-surface/50 dark:bg-white/5 backdrop-blur-xl border border-border dark:border-white/10 shadow-xl overflow-hidden w-full max-w-[280px] mx-auto">
            <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-sm font-semibold text-primary">
                    {monthNames[month]} {year}
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={prevMonth}
                        className="p-1 rounded-md hover:bg-surface dark:hover:bg-white/10 text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-1 rounded-md hover:bg-surface dark:hover:bg-white/10 text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map(day => (
                    <div key={day} className="h-9 w-9 flex items-center justify-center text-[10px] font-medium text-secondary/60 uppercase">
                        {day}
                    </div>
                ))}
                {days}
            </div>
        </div>
    );
};

export default Calendar;
