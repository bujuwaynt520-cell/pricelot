import { notFound } from "next/navigation";
import LessonTemplate from "@/app/components/LessonTemplate";
import { getLessonBySlug } from "@/app/lib/data/academyLessons";

interface Props {
  params: {
    id: string;
  };
}

export default function LessonPage({ params }: Props) {
  const lesson = getLessonBySlug(params.id);

  if (!lesson) {
    notFound();
  }

  return <LessonTemplate lesson={lesson} />;
}