import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface VideoGateProps {
  matchName: string;
  onComplete: () => void;
}

const TIMER_DURATION = 15; // 15 seconds

export default function VideoGate({ matchName, onComplete }: VideoGateProps) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (1 / TIMER_DURATION) * 100;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300); // Small delay before calling onComplete
          return 100;
        }
        return newProgress;
      });

      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      {/* Video Placeholder */}
      <View style={styles.videoPlaceholder}>
        <View style={styles.playIcon}>
          <View style={styles.playTriangle} />
        </View>
        <Text style={styles.videoTitle}>Intro Video</Text>
        <Text style={styles.matchName}>{matchName}</Text>
        <Text style={styles.videoSubtitle}>
          Getting to know you takes time...
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress}%` }
            ]}
          />
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {progress >= 100
              ? 'Ready to continue'
              : `Please wait ${timeRemaining}s...`}
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round(progress)}%
          </Text>
        </View>
      </View>

      {/* Info Text */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Meaningful connections take time. Watch {matchName}'s introduction
          to understand their energy and essence.
        </Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  videoPlaceholder: {
    width: '100%',
    height: width * 0.6, // 16:9-ish aspect ratio
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#3A3A3A',
    position: 'relative',
    overflow: 'hidden',
  },
  playIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 20,
  },
  playTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: '#FFD700',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 6,
  },
  videoTitle: {
    fontSize: 14,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  matchName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDD0',
    marginBottom: 8,
  },
  videoSubtitle: {
    fontSize: 16,
    color: '#FFFDD0',
    fontStyle: 'italic',
    opacity: 0.7,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#FFFDD0',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  infoText: {
    fontSize: 14,
    color: '#FFFDD0',
    lineHeight: 20,
    opacity: 0.9,
  },
});
