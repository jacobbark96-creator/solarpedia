import React, { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { glossaryData } from '../../data/glossary';

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return glossaryData;
    const lowerSearch = searchTerm.toLowerCase();
    return glossaryData.filter(
      (item) =>
        item.term.toLowerCase().includes(lowerSearch) ||
        item.definition.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  const groupedData = useMemo(() => {
    const groups: Record<string, typeof glossaryData> = {};
    filteredData.forEach((item) => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });
    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        letter,
        terms: groups[letter],
      }));
  }, [filteredData]);

  return (
    <div className="bg-brand-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-6 border border-brand-accent">
            <BookOpen className="h-8 w-8 text-brand-navy" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-4">
            Solar Glossary
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Confused by kWp, MPPT, or DNO applications? Search our comprehensive A-Z dictionary of UK solar jargon.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-brand-muted" />
          </div>
          <input
            type="text"
            id="glossary-search"
            name="glossary-search"
            className="block w-full pl-12 pr-4 py-5 bg-white border border-brand-accent rounded-full text-lg shadow-sm focus:ring-2 focus:ring-brand-navy focus:border-transparent outline-none transition-all placeholder:text-brand-muted/70"
            placeholder="Search for a term (e.g., 'Inverter' or 'Tariff')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search glossary"
          />
        </div>

        {/* Glossary List */}
        {groupedData.length === 0 ? (
          <div className="text-center bg-white border border-brand-accent rounded-3xl p-12">
            <h3 className="text-xl font-bold text-brand-navy mb-2">No terms found</h3>
            <p className="text-brand-muted">Try adjusting your search to find what you're looking for.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 text-brand-navy font-bold hover:text-brand-green transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedData.map((group) => (
              <div key={group.letter} className="scroll-mt-24" id={`letter-${group.letter}`}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-serif font-bold text-brand-navy">{group.letter}</h2>
                  <div className="h-px bg-brand-accent flex-grow"></div>
                </div>
                <div className="grid gap-6">
                  {group.terms.map((item) => (
                    <div 
                      key={item.term} 
                      className="bg-white border border-brand-accent rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-bold text-brand-navy mb-3">{item.term}</h3>
                      <p className="text-brand-muted leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;