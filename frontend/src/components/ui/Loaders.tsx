// src/components/ui/Loaders.tsx
import React from 'react';
import { MapPin, Plane, Calendar } from 'lucide-react';

// Simple spinner loader
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; color?: string }> = ({
    size = 'md',
    color = 'text-indigo-600 dark:text-indigo-400'
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`${sizeClasses[size]} ${color} animate-spin theme-transition`}>
            <div className="w-full h-full border-2 border-current border-t-transparent rounded-full"></div>
        </div>
    );
};

// Travel planning specific loader
export const TravelPlanningLoader: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-700 theme-transition">
            <div className="flex justify-center space-x-4 mb-6">
                <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
                    <MapPin className="w-8 h-8 text-indigo-600 dark:text-indigo-400 theme-transition" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: '150ms' }}>
                    <Plane className="w-8 h-8 text-blue-600 dark:text-blue-400 theme-transition" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: '300ms' }}>
                    <Calendar className="w-8 h-8 text-green-600 dark:text-green-400 theme-transition" />
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 theme-transition">Creating Your Perfect Trip</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 theme-transition">Our AI is analyzing destinations, costs, and creating your personalized itinerary...</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 theme-transition">
                <div className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full animate-pulse theme-transition" style={{ width: '70%' }}></div>
            </div>
        </div>
    );
};

// Skeleton loader for travel plans
export const TravelPlanSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 theme-transition">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse theme-transition"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/3 animate-pulse theme-transition"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse theme-transition"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 animate-pulse theme-transition"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6 animate-pulse theme-transition"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Generic loading overlay
export const LoadingOverlay: React.FC<{ message?: string }> = ({
    message = 'Loading...'
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 theme-transition">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm mx-4 text-center border border-gray-200 dark:border-gray-700 theme-transition">
                <Spinner size="lg" />
                <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium theme-transition">{message}</p>
            </div>
        </div>
    );
};

// Theme-aware pulse loader
export const ThemeAwarePulse: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="bg-gray-200 dark:bg-gray-600 rounded theme-transition"></div>
        </div>
    );
};

// Progress bar with theme support
export const ProgressBar: React.FC<{
    progress: number;
    className?: string;
    showPercentage?: boolean;
}> = ({
    progress,
    className = '',
    showPercentage = false
}) => {
        const clampedProgress = Math.min(Math.max(progress, 0), 100);

        return (
            <div className={`w-full ${className}`}>
                <div className="flex justify-between items-center mb-1">
                    {showPercentage && (
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 theme-transition">
                            {Math.round(clampedProgress)}%
                        </span>
                    )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 theme-transition">
                    <div
                        className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full transition-all duration-500 ease-out theme-transition"
                        style={{ width: `${clampedProgress}%` }}
                    ></div>
                </div>
            </div>
        );
    };

export default {
    Spinner,
    TravelPlanningLoader,
    TravelPlanSkeleton,
    LoadingOverlay,
    ThemeAwarePulse,
    ProgressBar
};