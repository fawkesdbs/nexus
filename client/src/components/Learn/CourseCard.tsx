import React from "react";
import { Star, Bookmark, Share2, Clock, Users, Play } from "lucide-react";
import type { Course } from "../../types/learn";

interface CourseCardProps {
  course: Course;
  onBookmark: (id: string) => void;
  onStart: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onBookmark,
  onStart,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300 group">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onBookmark(course.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              course.isBookmarked
                ? "bg-blue-600 text-white"
                : "bg-gray-900/80 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${course.isBookmarked ? "fill-current" : ""}`}
            />
          </button>
          <button className="p-2 rounded-full bg-gray-900/80 text-gray-300 hover:bg-gray-800 backdrop-blur-sm transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        {course.progress && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-white mt-1 font-medium">
              {course.progress}% Complete
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              course.level === "Beginner"
                ? "bg-green-900/50 text-green-400"
                : course.level === "Intermediate"
                ? "bg-yellow-900/50 text-yellow-400"
                : "bg-red-900/50 text-red-400"
            }`}
          >
            {course.level}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
            <span className="text-sm text-gray-400 ml-1">
              ({course.rating})
            </span>
          </div>
        </div>

        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-blue-400 font-medium">{course.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {course.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="text-sm text-gray-300">{course.instructor}</span>
          </div>

          <button
            onClick={() => onStart(course)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4" />
            <span>{course.progress ? "Continue" : "Start"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
