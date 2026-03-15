import { useState, useRef, useEffect } from 'react';
import { getSuggestedTags } from '../lib/tagUtils';
import { X } from 'lucide-react';

export default function TagInput({ tags, setTags, allTags }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue) {
      setSuggestions(getSuggestedTags(inputValue, allTags).filter(t => !tags.includes(t)));
    } else {
      setSuggestions(allTags.filter(t => !tags.includes(t)).slice(0, 5));
    }
  }, [inputValue, allTags, tags]);

  const addTag = (tag) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent min-h-[42px]">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-blue-950 focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Add tags..." : ""}
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 min-w-[120px] text-sm py-1 outline-none"
        />
      </div>
      
      {showSuggestions && (inputValue || suggestions.length > 0) && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
          {suggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => addTag(tag)}
            >
              {tag}
            </button>
          ))}
          {inputValue && !allTags.includes(inputValue.toLowerCase()) && !tags.includes(inputValue.toLowerCase()) && (
            <button
              type="button"
              className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-t border-gray-100"
              onClick={() => addTag(inputValue)}
            >
              Create "{inputValue.toLowerCase()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
