import { useState } from "react";

const CalendarSlider = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate next 15 days
  const dates = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  // Format month title
  const monthTitle = dates[0].toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Scroll left
  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Scroll right
  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, dates.length - 7));
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Month Title with Arrows */}
      <div className="flex items-center space-x-4">
        <button
          onClick={scrollLeft}
          className="p-2 rounded-full border bg-gray-200 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          ◀
        </button>
        <h2 className="text-lg font-semibold">{monthTitle}</h2>
        <button
          onClick={scrollRight}
          className="p-2 rounded-full border bg-gray-200"
          disabled={currentIndex >= dates.length - 7}
        >
          ▶
        </button>
      </div>

      {/* Calendar Dates */}
      <div className="overflow-hidden w-[500px]">
        <div
          className="flex space-x-2 transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 70}px)` }}
        >
          {dates.map((date, index) => (
            <button
              key={index}
              className={`p-3 border rounded-md w-20 text-center ${
                date.toDateString() === selectedDate.toDateString()
                  ? "bg-green-700 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="text-sm font-bold">
                {date.toLocaleString("en-US", { weekday: "short" })}
              </div>
              <div className="text-lg">{date.getDate()}</div>
              <div className="text-sm">{date.toLocaleString("en-US", { month: "short" })}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSlider;
