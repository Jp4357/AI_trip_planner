// src/pages/travel/TravelPlannerHome.tsx
import React, { useState } from 'react';
import { Send, MapPin, Calendar, DollarSign, Hotel, Utensils, Camera, ArrowRight } from 'lucide-react';
import { useGetTravelPlanMutation } from '../../services/api/travel/travelApi';
import TravelPlanDisplay from './TravelPlanDisplay';

const TravelPlannerHome: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [getTravelPlan, { data, error, isLoading }] = useGetTravelPlanMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim()) {
            try {
                await getTravelPlan({ question }).unwrap();
            } catch (err) {
                console.error('Error getting travel plan:', err);
            }
        }
    };

    const handleExampleClick = (exampleQuestion: string) => {
        setQuestion(exampleQuestion);
    };

    const exampleQuestions = [
        "Plan a 5-day trip to Paris",
        "Show me a budget-friendly plan for Bangkok",
        "Plan a family vacation in Tokyo",
        "Create an adventure trip to New Zealand"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">AI Trip Planner</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!data ? (
                    <>
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Plan Your Perfect Trip with AI
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Get personalized travel plans, recommendations, and itineraries tailored just for you.
                                Simply describe your dream destination and let our AI do the rest.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <Calendar className="w-10 h-10 text-indigo-600 mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Smart Itineraries</h3>
                                <p className="text-gray-600 text-sm">Optimized day-by-day plans based on your preferences</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <Hotel className="w-10 h-10 text-indigo-600 mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Hotel Recommendations</h3>
                                <p className="text-gray-600 text-sm">Curated accommodations for every budget</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <Utensils className="w-10 h-10 text-indigo-600 mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Local Cuisine</h3>
                                <p className="text-gray-600 text-sm">Discover authentic restaurants and local specialties</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <DollarSign className="w-10 h-10 text-indigo-600 mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Budget Planning</h3>
                                <p className="text-gray-600 text-sm">Detailed cost breakdowns and budget estimates</p>
                            </div>
                        </div>

                        {/* Search Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="travel-question" className="block text-lg font-medium text-gray-900 mb-3">
                                        Where would you like to go?
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="travel-question"
                                            type="text"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            placeholder="e.g., Plan a 7-day romantic trip to Italy with a budget of $3000"
                                            className="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !question.trim()}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Example Questions */}
                            <div className="mt-6">
                                <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
                                <div className="flex flex-wrap gap-2">
                                    {exampleQuestions.map((example, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleExampleClick(example)}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center space-x-1"
                                        >
                                            <span>{example}</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Perfect Trip</h3>
                                <p className="text-gray-600">Our AI is analyzing destinations, costs, and creating your personalized itinerary...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Camera className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
                                <p className="text-red-700">We couldn't generate your travel plan. Please try again.</p>
                            </div>
                        )}
                    </>
                ) : (
                    <TravelPlanDisplay
                        data={data}
                        onNewSearch={() => {
                            setQuestion('');
                            // Reset the data by triggering a new search state
                            window.location.reload();
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default TravelPlannerHome;