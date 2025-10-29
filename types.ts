export interface UploadedFile {
  name: string;
  content: string;
  selected: boolean;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface NestedSubIdea {
  id: string;
  level: 3;
  title: string;
  content?: string;
  flashcards?: Flashcard[];
  quizQuestions?: QuizQuestion[];
}

export interface SubIdea {
  id: string;
  level: 2;
  title: string;
  content?: string;
  flashcards?: Flashcard[];
  quizQuestions?: QuizQuestion[];
  nested_sub_ideas?: NestedSubIdea[];
}

export interface MainIdea {
  id: string;
  level: 1;
  title: string;
  content?: string;
  flashcards?: Flashcard[];
  quizQuestions?: QuizQuestion[];
  sub_ideas?: SubIdea[];
}

export interface Outline {
  subject: string;
  description: string;
  ideas: MainIdea[];
}

export interface Project {
  subject: string;
  createdAt: string;
  uploadedFiles: UploadedFile[];
  outlineJson: string | null;
  outlineWithSummariesJson: string | null;
  finalContentJson: string | null;
  studyMaterialsJson: string | null;
  fullScript: string | null;
  audioSegments: string[];
}
