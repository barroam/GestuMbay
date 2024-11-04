import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from "../../../layout/header/header.component";


interface Video {
  title: string;
  description: string;
  url: string;
  duration: string;
}

interface QuizQuestion {
  question: string;
  correctAnswer: boolean;
  explanation: string;
  category: string;
  userAnswer?: boolean | null;
  isCorrect?: boolean;
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  percentage: number;
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  categoryScores: { [key: string]: { correct: number; total: number } };
}


@Component({
  selector: 'app-formatiom',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './formatiom.component.html',
  styleUrl: './formatiom.component.css'
})
export class FormatiomComponent implements OnInit {


  videos: Video[] = [
    {
      title: "Problématiques de l'agriculture au Sénégal",
      description: "L’agriculture au Sénégal a fait face à des défis majeurs liés à la variabilité climatique, avec des sécheresses fréquentes qui ont affecté les rendements.",
      url: "https://www.youtube.com/embed/5rcyMCl5k7s",
      duration: "15:30"
    },
    {
      title: "Utilisation des Drones en Agriculture",
      description: "Comment les drones révolutionnent la surveillance des cultures et l'optimisation des ressources.",
      url: "https://www.youtube.com/embed/giJKEhGpi3g",
      duration: "12:45"
    },
    {
      title: "Systèmes d'Irrigation Intelligents",
      description: "Les dernières technologies en matière d'irrigation intelligente et leur mise en œuvre.",
      url: "https://www.youtube.com/embed/rZF75nJMTnw",
      duration: "18:20"
    },
    {
      title: "Analyse des Données Agricoles",
      description: "Méthodes et outils pour collecter et analyser efficacement les données agricoles.",
      url: "https://www.youtube.com/embed/W810z3mdLCI",
      duration: "6:34"
    },
    {
      title: "Gestion des Cultures Assistée par Ordinateur",
      description: "Les logiciels modernes de gestion des cultures et leur utilisation pratique.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "16:40"
    }
  ];

  quizQuestions: QuizQuestion[] = [
    {
      question: "Les capteurs IoT peuvent-ils améliorer l'efficacité de l'irrigation?",
      correctAnswer: true,
      explanation: "Les capteurs IoT permettent une irrigation précise basée sur les besoins réels des plantes.",
      category: "Irrigation"
    },
    {
      question: "L'agriculture numérique réduit-elle l'importance du savoir-faire traditionnel?",
      correctAnswer: false,
      explanation: "L'agriculture numérique complète le savoir-faire traditionnel sans le remplacer.",
      category: "Général"
    },
    {
      question: "Les drones peuvent-ils détecter les maladies des plantes?",
      correctAnswer: true,
      explanation: "Les drones équipés de caméras spéciales peuvent détecter les signes précoces de maladies.",
      category: "Drones"
    },
    {
      question: "L'analyse des données nécessite-t-elle une connexion Internet permanente?",
      correctAnswer: false,
      explanation: "Certaines analyses peuvent être effectuées hors ligne avec synchronisation ultérieure.",
      category: "Données"
    },
    {
      question: "La météo influence-t-elle la précision des capteurs agricoles?",
      correctAnswer: true,
      explanation: "Les conditions météorologiques peuvent affecter les mesures des capteurs.",
      category: "Capteurs"
    },
    {
      question: "Les systèmes d'irrigation intelligents fonctionnent-ils la nuit?",
      correctAnswer: true,
      explanation: "L'irrigation nocturne est souvent plus efficace et les systèmes fonctionnent 24/7.",
      category: "Irrigation"
    },
    {
      question: "Faut-il être informaticien pour utiliser les outils numériques agricoles?",
      correctAnswer: false,
      explanation: "Les outils sont conçus pour être utilisables par tous les agriculteurs.",
      category: "Général"
    },
    {
      question: "Les données collectées sont-elles uniquement utilisables l'année en cours?",
      correctAnswer: false,
      explanation: "Les données historiques sont précieuses pour l'analyse des tendances à long terme.",
      category: "Données"
    },
    {
      question: "Les drones agricoles nécessitent-ils un permis spécial?",
      correctAnswer: true,
      explanation: "La plupart des pays exigent une certification pour l'utilisation de drones agricoles.",
      category: "Drones"
    },
    {
      question: "L'agriculture numérique permet-elle de réduire l'utilisation des pesticides?",
      correctAnswer: true,
      explanation: "L'application ciblée permet de réduire la quantité totale de pesticides utilisée.",
      category: "Général"
    }
  ];

  currentVideoIndex = 0;
  currentVideo!: Video;
  currentVideoSafeUrl!: SafeResourceUrl;
  quizStarted = false;
  quizCompleted = false;
  answeredQuestions = 0;
  quizResults: QuizResults = this.initializeQuizResults();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.setCurrentVideo(0);
    this.shuffleQuizQuestions();
  }

  private initializeQuizResults(): QuizResults {
    return {
      score: 0,
      totalQuestions: this.quizQuestions.length,
      percentage: 0,
      categoryScores: this.initializeCategoryScores()
    };
  }

  private initializeCategoryScores(): Record<string, { correct: number; total: number }> {
    const scores: Record<string, { correct: number; total: number }> = {};
    const categories = [...new Set(this.quizQuestions.map(q => q.category))];

    categories.forEach(category => {
      scores[category] = { correct: 0, total: 0 };
    });

    return scores;
  }

  private shuffleQuizQuestions(): void {
    for (let i = this.quizQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.quizQuestions[i], this.quizQuestions[j]] =
        [this.quizQuestions[j], this.quizQuestions[i]];
    }
  }

  setCurrentVideo(index: number): void {
    if (index >= 0 && index < this.videos.length) {
      this.currentVideoIndex = index;
      this.currentVideo = this.videos[index];
      this.currentVideoSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.currentVideo.url
      );
    }
  }

  startQuiz(): void {
    this.quizStarted = true;
    this.resetQuiz();
  }

  answerQuestion(index: number, answer: boolean): void {
    const question = this.quizQuestions[index];
    if (question.userAnswer !== null) return;

    question.userAnswer = answer;
    question.isCorrect = answer === question.correctAnswer;
    this.answeredQuestions++;

    const category = question.category;
    this.quizResults.categoryScores[category].total++;
    if (question.isCorrect) {
      this.quizResults.categoryScores[category].correct++;
    }
  }

  finishQuiz(): void {
    if (this.answeredQuestions < this.quizQuestions.length) return;

    const correctAnswers = this.quizQuestions.filter(q => q.isCorrect).length;
    this.quizResults.score = correctAnswers;
    this.quizResults.percentage = Math.round(
      (correctAnswers / this.quizQuestions.length) * 100
    );
    this.quizCompleted = true;
  }

  resetQuiz(): void {
    this.quizQuestions.forEach(q => {
      q.userAnswer = null;
      q.isCorrect = undefined;
    });
    this.answeredQuestions = 0;
    this.quizCompleted = false;
    this.quizResults = this.initializeQuizResults();
    this.shuffleQuizQuestions();
  }

  getCategories(): string[] {
    return Object.keys(this.quizResults.categoryScores);
  }

  getCategoryScore(category: string): string {
    const scores = this.quizResults.categoryScores[category];
    return `${scores.correct}/${scores.total}`;
  }

  getCategoryPercentage(category: string): number {
    const scores = this.quizResults.categoryScores[category];
    return scores.total > 0 ? (scores.correct / scores.total) * 100 : 0;
  }
}
