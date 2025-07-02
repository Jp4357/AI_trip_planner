// src/components/ui/Loaders.tsx
import React from 'react';
import { MapPin, Plane, Calendar } from 'lucide-react';

// Simple spinner loader
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; color?: string }> = ({
    size = 'md',
    color = 'text-indigo-600'
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`${sizeClasses[size]} ${color} animate-spin`}>
            <div className="w-full h-full border-2 border-current border-t-transparent rounded-full"></div>
        </div>
    );
};

// Travel planning specific loader
export const TravelPlanningLoader: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="flex justify-center space-x-4 mb-6">
                <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
                    <MapPin className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: '150ms' }}>
                    <Plane className="w-8 h-8 text-blue-600" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: '300ms' }}>
                    <Calendar className="w-8 h-8 text-green-600" />
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Perfect Trip</h3>
            <p className="text-gray-600 mb-4">Our AI is analyzing destinations, costs, and creating your personalized itinerary...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
        </div>
    );
};

// Skeleton loader for travel plans
export const TravelPlanSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
                <Spinner size="lg" />
                <p className="mt-4 text-gray-700 font-medium">{message}</p>
            </div>
        </div>
    );
};

export default {
    Spinner,
    TravelPlanningLoader,
    TravelPlanSkeleton,
    LoadingOverlay
};