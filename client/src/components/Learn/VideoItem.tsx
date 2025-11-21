import React from "react";
import { Play } from "lucide-react";
import type { Video } from "../../types/learn";

interface VideoItemProps {
  video: Video;
  isActive?: boolean;
  onPlay: (video: Video) => void;
}

export const VideoItem: React.FC<VideoItemProps> = ({
  video,
  isActive = false,
  onPlay,
}) => {
  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
        isActive
          ? "bg-blue-900/30 border border-blue-700"
          : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
      }`}
      onClick={() => onPlay(video)}
    >
      <div className="relative shrink-0">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-20 h-12 object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-4 h-4 text-white" />
        </div>
        {video.isCompleted && (
          <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-medium line-clamp-2 ${
            isActive ? "text-white" : "text-gray-300"
          }`}
        >
          {video.title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">{video.duration}</p>
      </div>

      {isActive && (
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
};
