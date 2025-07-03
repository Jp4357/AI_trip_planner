// src/pages/travel/TravelPlannerHome.tsx
import React, { useState, useCallback } from 'react';
import { Send, MapPin, Calendar, DollarSign, Hotel, Utensils, Camera, ArrowRight, AlertCircle } from 'lucide-react';
import { useGetTravelPlanMutation } from '../../services/api/travel/travelApi';
import { EXAMPLE_TRAVEL_QUESTIONS } from '../../utils/constants/app_constants';
import TravelPlanDisplay from './TravelPlanDisplay';
import ThemeToggle from '../../components/ui/ThemeToggle';

interface ValidationError {
    field: string;
    message: string;
}

const TravelPlannerHome: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [getTravelPlan, { data, error, isLoading }] = useGetTravelPlanMutation();

    const validateForm = useCallback((questionText: string): ValidationError[] => {
        const errors: ValidationError[] = [];

        if (!questionText || questionText.trim().length === 0) {
            errors.push({
                field: 'question',
                message: 'Please enter your travel question'
            });
            return errors;
        }

        if (questionText.trim().length < 10) {
            errors.push({
                field: 'question',
                message: 'Please provide more details about your travel plans (at least 10 characters)'
            });
        }

        if (questionText.trim().length > 500) {
            errors.push({
                field: 'question',
                message: 'Please keep your question under 500 characters'
            });
        }

        // Check for travel-related keywords
        const lowerQuestion = questionText.toLowerCase();
        const travelKeywords = ['trip', 'travel', 'vacation', 'plan', 'visit', 'tour', 'holiday', 'journey'];
        const hasKeyword = travelKeywords.some(keyword => lowerQuestion.includes(keyword));

        if (!hasKeyword) {
            errors.push({
                field: 'question',
                message: 'Please include travel-related keywords in your question (e.g., trip, travel, vacation, plan)'
            });
        }

        return errors;
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous validation errors
        setValidationErrors([]);

        if (!question.trim()) {
            setValidationErrors([{ field: 'question', message: 'Please enter your travel question' }]);
            return;
        }

        // Validate the form
        const errors = validateForm(question.trim());
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            await getTravelPlan({ question: question.trim() }).unwrap();
        } catch (err: any) {
            console.error('Error getting travel plan:', err);

            // Handle validation errors from API
            if (err.status === 'VALIDATION_ERROR') {
                setValidationErrors([{ field: 'question', message: err.data }]);
            }
        }
    };

    const handleExampleClick = (exampleQuestion: string) => {
        setQuestion(exampleQuestion);
        setValidationErrors([]); // Clear any existing errors
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuestion(value);

        // Clear validation errors when user starts typing
        if (validationErrors.length > 0 && value.trim()) {
            setValidationErrors([]);
        }
    };

    const handleReset = () => {
        setQuestion('');
        setValidationErrors([]);
        // Reset the data by reloading - in a real app, you'd want to reset the RTK Query state
        window.location.reload();
    };

    const hasValidationErrors = validationErrors.length > 0;
    const questionError = validationErrors.find(err => err.field === 'question');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">AI Trip Planner</h1>
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle size="md" />
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!data ? (
                    <>
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                                Plan Your Perfect Trip with AI
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
                                Get personalized travel plans, recommendations, and itineraries tailored just for you.
                                Simply describe your dream destination and let our AI do the rest.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                                <Calendar className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4 transition-colors duration-200" />
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Smart Itineraries</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Optimized day-by-day plans based on your preferences</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                                <Hotel className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4 transition-colors duration-200" />
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Hotel Recommendations</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Curated accommodations for every budget</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                                <Utensils className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4 transition-colors duration-200" />
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Local Cuisine</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Discover authentic restaurants and local specialties</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                                <DollarSign className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4 transition-colors duration-200" />
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Budget Planning</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Detailed cost breakdowns and budget estimates</p>
                            </div>
                        </div>

                        {/* Search Form */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="travel-question" className="block text-lg font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-200">
                                        Where would you like to go?
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="travel-question"
                                            type="text"
                                            value={question}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Plan a 7-day romantic trip to Italy with a budget of $3000"
                                            className={`w-full px-6 py-4 pr-16 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200
                                                bg-white dark:bg-gray-700 
                                                text-gray-900 dark:text-white 
                                                placeholder-gray-500 dark:placeholder-gray-400
                                                ${questionError
                                                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                                                    : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'
                                                }`}
                                            disabled={isLoading}
                                            aria-invalid={hasValidationErrors}
                                            aria-describedby={questionError ? 'question-error' : undefined}
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !question.trim()}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white p-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Validation Error Display */}
                                    {questionError && (
                                        <div id="question-error" className="mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 transition-colors duration-200">
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-sm">{questionError.message}</span>
                                        </div>
                                    )}
                                </div>
                            </form>

                            {/* Example Questions */}
                            <div className="mt-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-200">Try these examples:</p>
                                <div className="flex flex-wrap gap-2">
                                    {EXAMPLE_TRAVEL_QUESTIONS.map((example, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleExampleClick(example)}
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                                <div className="w-16 h-16 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Creating Your Perfect Trip</h3>
                                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Our AI is analyzing destinations, costs, and creating your personalized itinerary...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center transition-colors duration-200">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2 transition-colors duration-200">Something went wrong</h3>
                                <p className="text-red-700 dark:text-red-400 transition-colors duration-200">
                                    {typeof error === 'object' && 'data' in error
                                        ? String(error.data)
                                        : 'We couldn\'t generate your travel plan. Please try again.'
                                    }
                                </p>
                                <button
                                    onClick={() => setQuestion('')}
                                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <TravelPlanDisplay
                        data={data}
                        onNewSearch={handleReset}
                    />
                )}
            </div>
        </div>
    );
};

export default TravelPlannerHome;