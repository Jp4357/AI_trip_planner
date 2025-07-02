// src/pages/travel/TravelPlanDisplay.tsx
import React from 'react';
import { ArrowLeft, MapPin, Calendar, DollarSign, Hotel, Utensils, Car, Camera, Sun } from 'lucide-react';
import type { TravelResponse } from '../../services/api/travel/travelApi';

interface TravelPlanDisplayProps {
    data: TravelResponse;
    onNewSearch: () => void;
}

const TravelPlanDisplay: React.FC<TravelPlanDisplayProps> = ({ data, onNewSearch }) => {
    // Parse the markdown-like content into sections
    const parseContent = (content: string) => {
        const sections = content.split('---').filter(section => section.trim());
        return sections.map(section => section.trim());
    };

    const parseTableContent = (content: string) => {
        const lines = content.split('\n').filter(line => line.trim());
        const tableLines = lines.filter(line => line.includes('|'));

        if (tableLines.length < 2) return null;

        const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);
        const rows = tableLines.slice(2).map(row =>
            row.split('|').map(cell => cell.trim()).filter(cell => cell)
        );

        return { headers, rows };
    };

    const renderSection = (section: string, index: number) => {
        const lines = section.split('\n').filter(line => line.trim());
        if (lines.length === 0) return null;

        const title = lines[0].replace(/#+\s*\*?\*?/, '').trim();
        const content = lines.slice(1).join('\n');

        // Determine section type and icon
        let icon = <Calendar className="w-6 h-6" />;
        let bgColor = "bg-blue-50";
        let iconColor = "text-blue-600";

        if (title.toLowerCase().includes('hotel')) {
            icon = <Hotel className="w-6 h-6" />;
            bgColor = "bg-purple-50";
            iconColor = "text-purple-600";
        } else if (title.toLowerCase().includes('restaurant') || title.toLowerCase().includes('food')) {
            icon = <Utensils className="w-6 h-6" />;
            bgColor = "bg-green-50";
            iconColor = "text-green-600";
        } else if (title.toLowerCase().includes('cost') || title.toLowerCase().includes('budget')) {
            icon = <DollarSign className="w-6 h-6" />;
            bgColor = "bg-yellow-50";
            iconColor = "text-yellow-600";
        } else if (title.toLowerCase().includes('transport')) {
            icon = <Car className="w-6 h-6" />;
            bgColor = "bg-indigo-50";
            iconColor = "text-indigo-600";
        } else if (title.toLowerCase().includes('attraction') || title.toLowerCase().includes('places')) {
            icon = <Camera className="w-6 h-6" />;
            bgColor = "bg-red-50";
            iconColor = "text-red-600";
        } else if (title.toLowerCase().includes('weather')) {
            icon = <Sun className="w-6 h-6" />;
            bgColor = "bg-orange-50";
            iconColor = "text-orange-600";
        }

        // Check if content contains a table
        const tableData = parseTableContent(content);

        return (
            <div key={index} className={`${bgColor} rounded-xl p-6 border border-gray-100 shadow-sm`}>
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`${iconColor} ${bgColor} p-2 rounded-lg`}>
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>

                {tableData ? (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {tableData.headers.map((header, i) => (
                                        <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tableData.rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-4 py-3 text-sm text-gray-700">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        {content.split('\n').map((line, i) => {
                            if (line.trim().startsWith('- ')) {
                                return (
                                    <div key={i} className="flex items-start space-x-2 mb-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700">{line.replace('- ', '')}</p>
                                    </div>
                                );
                            } else if (line.match(/^\d+\./)) {
                                return (
                                    <div key={i} className="flex items-start space-x-3 mb-3">
                                        <div className="bg-gray-200 text-gray-700 text-sm font-semibold px-2 py-1 rounded-full min-w-[24px] text-center">
                                            {line.match(/^\d+/)?.[0]}
                                        </div>
                                        <p className="text-gray-700 flex-1">{line.replace(/^\d+\.\s*/, '')}</p>
                                    </div>
                                );
                            } else if (line.trim()) {
                                return (
                                    <p key={i} className="text-gray-700 mb-2 leading-relaxed">
                                        {line}
                                    </p>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    };

    const sections = parseContent(data.answer);

    return (
        <div className="space-y-8">
            {/* Header with back button */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onNewSearch}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Plan Another Trip</span>
                </button>

                <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>Your Personalized Travel Plan</span>
                </div>
            </div>

            {/* Travel Plan Content */}
            <div className="space-y-6">
                {sections.map((section, index) => renderSection(section, index))}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                        Save This Plan
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                        Share Plan
                    </button>
                    <button
                        onClick={onNewSearch}
                        className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                    >
                        Create New Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TravelPlanDisplay;