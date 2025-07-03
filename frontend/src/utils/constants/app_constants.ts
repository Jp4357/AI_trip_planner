// Default example questions for the travel planner
export const EXAMPLE_TRAVEL_QUESTIONS = [
    "Plan a 3-day trip to Pattaya with a budget of $1000",
    "Plan a 5-day trip to Paris with a budget of $2000",
    "Show me a budget-friendly plan for Bangkok",
    "Plan a family vacation in Tokyo for 7 days",
    "Create an adventure trip to New Zealand",
    "Plan a romantic getaway to Santorini",
    "Show me an off-beat plan for Pattaya",
    "Plan a backpacking trip through Southeast Asia"
];

// Travel plan section types - using const object instead of enum
export const TravelSectionType = {
    ITINERARY: 'itinerary',
    HOTELS: 'hotels',
    RESTAURANTS: 'restaurants',
    ACTIVITIES: 'activities',
    TRANSPORTATION: 'transportation',
    BUDGET: 'budget',
    WEATHER: 'weather',
    ATTRACTIONS: 'attractions'
} as const;

// Type for the section values
export type TravelSectionTypeValue = typeof TravelSectionType[keyof typeof TravelSectionType];

// Helper function to get section type from title
export const getSectionType = (title: string): TravelSectionTypeValue => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('hotel')) return TravelSectionType.HOTELS;
    if (lowerTitle.includes('restaurant') || lowerTitle.includes('food')) return TravelSectionType.RESTAURANTS;
    if (lowerTitle.includes('cost') || lowerTitle.includes('budget')) return TravelSectionType.BUDGET;
    if (lowerTitle.includes('transport')) return TravelSectionType.TRANSPORTATION;
    if (lowerTitle.includes('attraction') || lowerTitle.includes('places')) return TravelSectionType.ATTRACTIONS;
    if (lowerTitle.includes('weather')) return TravelSectionType.WEATHER;
    if (lowerTitle.includes('activit')) return TravelSectionType.ACTIVITIES;

    return TravelSectionType.ITINERARY; // default
};