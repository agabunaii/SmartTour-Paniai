import { Destination, UserPreference } from "../types";

/**
 * Calculates a simplified Cosine Similarity score.
 * Since we don't have a full vector database, we simulate it by weighting features.
 */
export const calculateRecommendations = (
  destinations: Destination[],
  preferences: UserPreference
): Destination[] => {
  
  // If no preferences, return top rated
  if (
    preferences.preferredCategories.length === 0 &&
    preferences.preferredFacilities.length === 0 &&
    preferences.keywords.length === 0
  ) {
    return [...destinations].sort((a, b) => b.rating - a.rating);
  }

  const scoredDestinations = destinations.map((dest) => {
    let score = 0;
    let maxPossibleScore = 0;

    // 1. Category Match (Weight: 3)
    maxPossibleScore += 3;
    if (preferences.preferredCategories.includes(dest.category)) {
      score += 3;
    }

    // 2. Facility Match (Weight: 1 per facility)
    if (preferences.preferredFacilities.length > 0) {
      const matchingFacilities = dest.facilities.filter(f => 
        preferences.preferredFacilities.includes(f)
      );
      const facilityScore = matchingFacilities.length / preferences.preferredFacilities.length; // Normalize
      score += facilityScore * 2; // Weight 2
      maxPossibleScore += 2;
    }

    // 3. Feature/Keyword Match (Weight: 4) - The "Content" part
    if (preferences.keywords.length > 0) {
       const matchingKeywords = dest.features.filter(f => 
         preferences.keywords.includes(f)
       );
       const featureScore = matchingKeywords.length / Math.max(1, preferences.keywords.length);
       score += featureScore * 4; // Weight 4
       maxPossibleScore += 4;
    }

    return {
      ...dest,
      similarityScore: maxPossibleScore > 0 ? score / maxPossibleScore : 0
    };
  });

  // Filter threshold (e.g. > 0.1 relevance) and Sort
  return scoredDestinations
    .sort((a, b) => b.similarityScore - a.similarityScore);
};