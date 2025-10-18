import React, { useState } from "react";
import { Stack, Link } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  const theme = useTheme();
  const [recentStudies] = useState([
    {
      id: '1',
      title: 'Biology Chapter 5',
      subject: 'Biology',
      progress: 65,
      lastAccessed: '2 hours ago',
    },
    {
      id: '2',
      title: 'History Essay Notes',
      subject: 'History',
      progress: 40,
      lastAccessed: '1 day ago',
    },
  ]);

  const renderHeaderRight = () => (
    <Link href="/upload" asChild>
      <Pressable style={styles.headerButton}>
        <IconSymbol name="plus" color={theme.colors.primary} size={24} />
      </Pressable>
    </Link>
  );

  const renderHeaderLeft = () => (
    <Link href="/(tabs)/profile" asChild>
      <Pressable style={styles.headerButton}>
        <IconSymbol name="gear" color={theme.colors.primary} size={24} />
      </Pressable>
    </Link>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "StudyAI",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
          }}
        />
      )}
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[commonStyles.title, { color: theme.colors.text }]}>
            Welcome Back! 👋
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            Ready to study smarter?
          </Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <Link href="/upload" asChild>
            <Pressable
              style={[
                styles.actionCard,
                { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
            >
              <IconSymbol name="arrow.up.doc" color="white" size={28} />
              <Text style={styles.actionCardText}>Upload Material</Text>
            </Pressable>
          </Link>

          <Link href="/quiz" asChild>
            <Pressable
              style={[
                styles.actionCard,
                { backgroundColor: colors.secondary, borderColor: colors.secondary }
              ]}
            >
              <IconSymbol name="questionmark.circle" color="white" size={28} />
              <Text style={styles.actionCardText}>Take Quiz</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.quickActionsContainer}>
          <Link href="/flashcards" asChild>
            <Pressable
              style={[
                styles.actionCard,
                { backgroundColor: colors.accent, borderColor: colors.accent }
              ]}
            >
              <IconSymbol name="square.grid.2x2" color="white" size={28} />
              <Text style={styles.actionCardText}>Flashcards</Text>
            </Pressable>
          </Link>

          <Link href="/progress" asChild>
            <Pressable
              style={[
                styles.actionCard,
                { backgroundColor: colors.highlight, borderColor: colors.highlight }
              ]}
            >
              <IconSymbol name="chart.bar" color={colors.text} size={28} />
              <Text style={[styles.actionCardText, { color: colors.text }]}>Progress</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[commonStyles.subtitle, { color: theme.colors.text }]}>
            Recent Studies
          </Text>
          {recentStudies.map((study) => (
            <Link key={study.id} href={`/study/${study.id}`} asChild>
              <Pressable
                style={[
                  styles.studyCard,
                  { backgroundColor: theme.colors.card, borderColor: theme.colors.border }
                ]}
              >
                <View style={styles.studyCardContent}>
                  <Text style={[styles.studyTitle, { color: theme.colors.text }]}>
                    {study.title}
                  </Text>
                  <Text style={[styles.studySubject, { color: theme.colors.text }]}>
                    {study.subject}
                  </Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${study.progress}%`, backgroundColor: colors.primary }
                      ]}
                    />
                  </View>
                  <Text style={[styles.studyMeta, { color: colors.textSecondary }]}>
                    {study.progress}% complete • {study.lastAccessed}
                  </Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </Pressable>
            </Link>
          ))}
        </View>

        <View style={styles.premiumBanner}>
          <View style={styles.premiumContent}>
            <Text style={[styles.premiumTitle, { color: colors.card }]}>
              Unlock Premium 🚀
            </Text>
            <Text style={[styles.premiumDescription, { color: colors.card }]}>
              Get unlimited uploads, advanced quizzes & personalized insights
            </Text>
          </View>
          <Link href="/subscription" asChild>
            <Pressable style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Learn More</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Platform.OS !== 'ios' ? 120 : 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  studyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  studyCardContent: {
    flex: 1,
  },
  studyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  studySubject: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  studyMeta: {
    fontSize: 12,
    fontWeight: '400',
  },
  headerButton: {
    padding: 8,
    marginHorizontal: 8,
  },
  premiumBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 4px 12px rgba(63, 81, 181, 0.3)',
    elevation: 4,
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  premiumDescription: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  premiumButton: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  premiumButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
});
