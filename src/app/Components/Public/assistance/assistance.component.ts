// assistance.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from "../../../layout/header/header.component";

interface VideoTutorial {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  safeUrl: SafeResourceUrl;
  isPlaying?: boolean;
}


@Component({
  selector: 'app-assistance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent], // Inclusion de NgbModule
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss']
})
export class AssistanceComponent {
  contactForm: FormGroup;
  showSuccessModal = false;
  selectedVideo: VideoTutorial | null = null;



  videoTutorials: VideoTutorial[] = [
    {
      id: 1,
      title: 'Faire une demande',
      description: 'Guide complet sur l\'utilisation des drones pour l\'agriculture de précision',
      url: 'https://www.youtube.com/embed/98WehtAxh3Y',
      thumbnail: 'https://img.freepik.com/vecteurs-libre/vecteur-conception-papier-lettres-marron-vierge_53876-173620.jpg?t=st=1730807892~exp=1730811492~hmac=84926971ce216a0c8ad594aff8d4d114dca37e9cf346ffa8e6ce5710f2b67167&w=740',
      safeUrl: '' as SafeResourceUrl,
      isPlaying: false
    },
    {
      id: 2,
      title: 'Se connecter',
      description: 'Comment optimiser la gestion de vos cultures avec notre plateforme',
      url: 'https://www.youtube.com/embed/anotherUniqueVideoId',
      thumbnail: 'https://img.freepik.com/vecteurs-libre/vecteur-conception-papier-lettres-marron-vierge_53876-173620.jpg?t=st=1730807892~exp=1730811492~hmac=84926971ce216a0c8ad594aff8d4d114dca37e9cf346ffa8e6ce5710f2b67167&w=740',
      safeUrl: '' as SafeResourceUrl,
      isPlaying: false
    },
    {
      id: 3,
      title: 'S\'inscrire',
      description: 'Comprendre et utiliser les données agricoles',
      url: 'https://www.youtube.com/embed/yetAnotherUniqueVideoId',
      thumbnail: 'https://img.freepik.com/vecteurs-libre/vecteur-conception-papier-lettres-marron-vierge_53876-173620.jpg?t=st=1730807892~exp=1730811492~hmac=84926971ce216a0c8ad594aff8d4d114dca37e9cf346ffa8e6ce5710f2b67167&w=740',
      safeUrl: '' as SafeResourceUrl,
      isPlaying: false
    }
  ];

  faqItems = [
    {
      question: 'Comment réinitialiser mon mot de passe ?',
      answer: 'Pour réinitialiser votre mot de passe, cliquez sur "Mot de passe oublié" sur la page de connexion. Suivez ensuite les instructions envoyées à votre adresse e-mail.'
    },
    {
      question: 'Comment mettre à jour mes informations de culture ?',
      answer: 'Connectez-vous à votre compte, allez dans "Gestion des cultures", puis cliquez sur "Modifier" à côté de la culture que vous souhaitez mettre à jour.'
    },
    {
      question: 'Comment obtenir de l\'aide pour l\'utilisation d\'un drone agricole ?',
      answer: 'Nous proposons des tutoriels vidéo sur l\'utilisation des drones agricoles dans notre section "Support Vidéo". Si vous avez besoin d\'une assistance personnalisée, vous pouvez nous contacter via le formulaire.'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.videoTutorials.forEach(video => {
      video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    });
  }


  toggleVideo(video: VideoTutorial): void {
    if (this.selectedVideo === video) {
      this.selectedVideo = null;
      video.isPlaying = false;

    } else {
      if (this.selectedVideo) {
        this.selectedVideo.isPlaying = false;
      }
      this.selectedVideo = video;
      video.isPlaying = true;
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const mailtoLink = `mailto:barroama23@gnail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;
      this.showSuccessModal = true;

      // Réinitialiser le formulaire après 22 secondes
      setTimeout(() => {
        this.contactForm.reset();
        this.showSuccessModal = false;
      }, 22000);
    }
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }
}
