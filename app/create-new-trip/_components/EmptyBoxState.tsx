import { suggestions } from '@/app/_components/Hero'

type EmptyBoxStateProps = {
  onSelectOption: (option: string) => void;
};

function EmptyBoxState({ onSelectOption }: EmptyBoxStateProps) {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-3xl text-center">Start Planning New Trip AI</h2>
      <p className="text-center text-gray-400 mt-2">
        Discover personalized travel itineraries, find the best destinations, and plan your dream vacation effortlessly
        with the power of AI. Let our smart assistant do the hard work while you enjoy the journey.
      </p>

      <div className="flex gap-5 flex-col mt-7">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(suggestion.title)}
            className="flex items-center gap-2 p-3 border rounded-full cursor-pointer hover:border-primary transition-colors shadow-sm"
          >
            {suggestion.icon}
            <h2 className="text-lg">{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
