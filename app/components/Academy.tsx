"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { GraduationCap, Clock, Award, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, BookOpen, ChevronRight, Search } from "lucide-react";
import { SAMPLE_LESSONS_EXTENDED as SAMPLE_LESSONS } from "../lib/contentEngine";
import { AcademyLesson } from "../types";
import { useAnalytics } from "../hooks/useAnalytics";

interface AcademyProps {
  selectedLessonId?: string | null;
  onClearSelection?: () => void;
}

export default function Academy({ selectedLessonId, onClearSelection }: AcademyProps) {
  const { trackEvent } = useAnalytics();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLesson, setActiveLesson] = useState<AcademyLesson | null>(null);
  
  // Lesson Reading States
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<boolean | null>(null); // null = unsubmitted, true = correct, false = incorrect
  const [readProgress, setReadProgress] = useState(0);

  const categories = ["All", "Beginners Guide", "Technical Analysis", "Risk Management", "Trading Psychology", "Pro Trading Guides", "Forex Basics"];

  // deep-link from global search
  useEffect(() => {
    if (selectedLessonId) {
      const lesson = SAMPLE_LESSONS.find((l) => l.id === selectedLessonId);
      if (lesson) {
        handleStartLesson(lesson);
        if (onClearSelection) {
          onClearSelection();
        }
      }
    }
  }, [selectedLessonId]);

  const handleStartLesson = (lesson: AcademyLesson) => {
    setActiveLesson(lesson);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizScore(null);
    setReadProgress(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    trackEvent("academy_lesson_started", "Academy", lesson.title, { id: lesson.id });
  };

  const handleCloseLesson = () => {
    if (activeLesson) {
      trackEvent("academy_lesson_closed", "Academy", activeLesson.title, { progress: readProgress });
    }
    setActiveLesson(null);
    if (onClearSelection) {
      onClearSelection();
    }
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null || !activeLesson) return;

    const isCorrect = selectedAnswer === activeLesson.quiz.correctAnswer;
    setQuizScore(isCorrect);
    setQuizSubmitted(true);

    trackEvent("academy_quiz_submitted", "Academy", activeLesson.title, {
      question: activeLesson.quiz.question,
      answerIndex: selectedAnswer,
      isCorrect,
    });
  };

  // Filter lessons
  const filteredLessons = SAMPLE_LESSONS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" ? true : item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="academy-section" className="space-y-8 animate-fade-in">
      
      {/* Dynamic reading mode */}
      {activeLesson ? (
        <div className="bg-white rounded-xl border border-zinc-200 p-6 md:p-8 space-y-6 max-w-4xl mx-auto text-left shadow-md">
          {/* Back Button */}
          <button
            onClick={handleCloseLesson}
            className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition text-sm cursor-pointer font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 animate-pulse" /> Back to Academy Library
          </button>

          {/* Lesson Metadata Header */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 uppercase tracking-wider font-bold">
                {activeLesson.category}
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200 flex items-center gap-1 font-bold">
                <Clock className="w-3 h-3 text-zinc-400" /> {activeLesson.readTime}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full uppercase border font-bold ${
                activeLesson.difficulty === "Beginner" 
                  ? "bg-orange-50 text-orange-600 border-orange-100" 
                  : activeLesson.difficulty === "Intermediate" 
                  ? "bg-zinc-50 text-zinc-600 border-zinc-200" 
                  : "bg-zinc-900 text-white border-zinc-850"
              }`}>
                {activeLesson.difficulty}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black italic text-zinc-900 leading-tight">
              {activeLesson.title}
            </h2>
          </div>

          {/* Lesson Content Sections */}
          <article className="space-y-5 border-t border-b border-zinc-100 py-8 text-zinc-700 text-base md:text-lg leading-relaxed font-sans">
            {activeLesson.content.map((paragraph, index) => (
              <p key={index} className="indent-0">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Interactive Lesson Quiz */}
          <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-6 md:p-8 space-y-6 shadow-inner">
            <div className="flex items-center gap-2.5">
              <Award className="w-6 h-6 text-orange-600 shrink-0" />
              <h3 className="text-zinc-900 font-serif font-bold italic text-lg">Interactive Concept Check</h3>
            </div>
            <p className="text-zinc-800 text-sm md:text-base font-bold leading-relaxed">
              {activeLesson.quiz.question}
            </p>

            {/* Quiz Options */}
            <div className="grid gap-3">
              {activeLesson.quiz.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                let optionStyle = "bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-700";
                
                if (isSelected) {
                  optionStyle = "bg-orange-50 border-orange-400 text-orange-700 shadow-sm";
                }

                if (quizSubmitted) {
                  if (idx === activeLesson.quiz.correctAnswer) {
                    optionStyle = "bg-orange-50 border-orange-400 text-orange-700 font-bold";
                  } else if (isSelected) {
                    optionStyle = "bg-zinc-100 border-zinc-200 text-zinc-400";
                  } else {
                    optionStyle = "bg-white border-zinc-100 text-zinc-400 pointer-events-none";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => {
                      setSelectedAnswer(idx);
                      trackEvent("academy_quiz_option_selected", "Academy", activeLesson.title, { optionIndex: idx });
                    }}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left text-sm md:text-base transition cursor-pointer ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-zinc-100 text-zinc-500 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit & Result Panel */}
            <div className="pt-2">
              {!quizSubmitted ? (
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleQuizSubmit}
                  className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-sm text-center cursor-pointer transition ${
                    selectedAnswer === null
                      ? "bg-zinc-200 text-zinc-400 border border-zinc-200 pointer-events-none"
                      : "bg-orange-600 hover:bg-orange-500 text-white shadow-sm"
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  {quizScore ? (
                    <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-orange-600" />
                      <div>
                        <div className="font-serif font-bold italic text-sm">Correct Answer! Excellent work.</div>
                        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                          {activeLesson.quiz.explanation}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-4 bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-xl">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-zinc-400" />
                      <div>
                        <div className="font-serif font-bold italic text-sm">Incorrect Answer</div>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                          {activeLesson.quiz.explanation}
                        </p>
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setSelectedAnswer(null);
                            setQuizScore(null);
                            trackEvent("academy_quiz_retried", "Academy", activeLesson.title);
                          }}
                          className="mt-2 text-xs font-bold underline text-orange-600 hover:text-orange-500 cursor-pointer"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      onClick={handleCloseLesson}
                      className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition text-center cursor-pointer"
                    >
                      Complete Lesson & Back
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Previous / Next Lesson Navigation */}
            {(() => {
              const currentIndex = SAMPLE_LESSONS.findIndex(l => l.id === activeLesson.id);
              const prevLesson = currentIndex > 0 ? SAMPLE_LESSONS[currentIndex - 1] : null;
              const nextLesson = currentIndex < SAMPLE_LESSONS.length - 1 ? SAMPLE_LESSONS[currentIndex + 1] : null;
              return (
                <div className="pt-6 border-t border-zinc-150 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs font-mono">
                  {prevLesson ? (
                    <button
                      onClick={() => handleStartLesson(prevLesson)}
                      className="w-full sm:w-auto flex flex-col items-start gap-1 p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-left transition cursor-pointer max-w-sm"
                    >
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <ArrowLeft className="w-3.5 h-3.5" /> Previous Lesson
                      </span>
                      <span className="text-zinc-800 font-bold font-sans line-clamp-1">
                        {prevLesson.title}
                      </span>
                    </button>
                  ) : (
                    <div className="hidden sm:block w-1" />
                  )}

                  {nextLesson ? (
                    <button
                      onClick={() => handleStartLesson(nextLesson)}
                      className="w-full sm:w-auto flex flex-col items-end gap-1 p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-right transition cursor-pointer max-w-sm sm:ml-auto"
                    >
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                        Next Lesson <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-zinc-800 font-bold font-sans line-clamp-1">
                        {nextLesson.title}
                      </span>
                    </button>
                  ) : (
                    <div className="hidden sm:block w-1" />
                  )}
                </div>
              );
            })()}

          </div>
        </div>
      ) : (
        /* Lesson library list */
        <div className="space-y-8">
          {/* Module Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0 shadow-inner">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-black italic text-zinc-900 tracking-tight">PriceLot Academy Portal</h2>
                <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
                  Interactive curriculum built by veteran trading psychologists and quantitative analysts. Completely free of sales funnels.
                </p>
              </div>
            </div>
          </div>

          {/* Filtering row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-50 p-4 border border-zinc-200 rounded-xl shadow-sm">
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value.length > 2) {
                    trackEvent("academy_search_typed", "Academy", e.target.value);
                  }
                }}
                className="w-full bg-white text-zinc-800 text-xs pl-9 pr-4 py-2 border border-zinc-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl focus:outline-none transition shadow-inner"
              />
            </div>

            <div className="w-full sm:w-auto overflow-x-auto custom-scrollbar flex items-center gap-1.5 scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    trackEvent("academy_category_filtered", "Academy", cat);
                  }}
                  className={`px-3 py-1.5 text-[11px] font-bold rounded-full border transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white border-transparent"
                      : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  {cat === "All" ? "All Subjects" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lesson card list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md group text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 uppercase tracking-wider">
                        {lesson.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lesson.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-zinc-900 text-lg font-serif font-black italic group-hover:text-orange-600 transition-colors tracking-tight">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                      {lesson.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${
                      lesson.difficulty === "Beginner" 
                        ? "bg-orange-50 text-orange-600 border-orange-100" 
                        : lesson.difficulty === "Intermediate" 
                        ? "bg-zinc-50 text-zinc-600 border-zinc-200" 
                        : "bg-zinc-900 text-white border-zinc-850"
                    }`}>
                      {lesson.difficulty}
                    </span>
                    <button
                      onClick={() => handleStartLesson(lesson)}
                      className="text-xs font-bold text-orange-600 hover:text-orange-500 flex items-center gap-1 cursor-pointer"
                    >
                      Read Lesson & Quiz <ChevronRight className="w-4 h-4 animate-pulse" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-16 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl">
                <BookOpen className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                <p className="text-zinc-700 font-semibold">No educational tutorials match your keywords</p>
                <p className="text-zinc-400 text-sm mt-1">Try searching for other parameters or resetting filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    trackEvent("academy_reset_filters", "Academy", "Clear Filters");
                  }}
                  className="mt-4 px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition cursor-pointer shadow-sm"
                >
                  Clear Search Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
