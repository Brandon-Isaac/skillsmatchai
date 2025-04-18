import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface ProfileData {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  currentJobTitle: string;
  yearsOfExperience: number;
  preferredJobType: string;
  preferredLocation: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  availabilityStatus: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  matchScore: number;
  recentActivity: Activity[];
}

interface Skill {
  name: string;
  level: string;
  category: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  location: string;
}

interface Activity {
  type: string;
  description: string;
  date: string;
  icon: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatTabsModule,
    MatBadgeModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  template: `
    <div class="profile-container" *ngIf="profile">
      <!-- Header Section -->
      <div class="profile-header" [@fadeIn]>
        <div class="header-content">
          <div class="profile-avatar">
            <div class="avatar-circle">
              {{ profile.firstName.charAt(0) }}{{ profile.lastName.charAt(0) }}
            </div>
            <div class="availability-badge" [ngClass]="getAvailabilityClass(profile.availabilityStatus)">
              <span>{{ getAvailabilityText(profile.availabilityStatus) }}</span>
            </div>
          </div>
          <div class="profile-info">
            <h1>{{ profile.firstName }} {{ profile.lastName }}</h1>
            <h2>{{ profile.headline }}</h2>
            <div class="profile-stats">
              <div class="stat">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ profile.location }}</span>
              </div>
              <div class="stat">
                <i class="fas fa-briefcase"></i>
                <span>{{ profile.yearsOfExperience }} years experience</span>
              </div>
              <div class="stat">
                <i class="fas fa-users"></i>
                <span>{{ profile.preferredJobType | titlecase }}</span>
              </div>
            </div>
            <div class="profile-actions">
              <button mat-raised-button color="primary">
                <i class="fas fa-edit"></i> Edit Profile
              </button>
              <button mat-stroked-button>
                <i class="fas fa-download"></i> Download CV
              </button>
              <button mat-stroked-button matTooltip="Share profile link">
                <i class="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
          <div class="match-score" matTooltip="AI Match Score - How well your profile matches job requirements">
            <div class="score-circle">
              <div class="score-value">{{ profile.matchScore }}%</div>
              <svg viewBox="0 0 36 36" class="score-chart">
                <path class="score-circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path class="score-circle-fill"
                  [attr.stroke-dasharray]="profile.matchScore + ', 100'"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <span>Match Score</span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="profile-content">
        <div class="content-grid">
          <!-- Left Column -->
          <div class="left-column" [@slideIn]>
            <!-- Summary Card -->
            <mat-card class="profile-card summary-card">
              <mat-card-header>
                <mat-card-title>About</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>{{ profile.summary }}</p>
              </mat-card-content>
            </mat-card>

            <!-- Contact Card -->
            <mat-card class="profile-card contact-card">
              <mat-card-header>
                <mat-card-title>Contact Information</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="contact-item">
                  <i class="fas fa-envelope"></i>
                  <span>{{ profile.email }}</span>
                </div>
                <div class="contact-item">
                  <i class="fas fa-phone"></i>
                  <span>{{ profile.phone }}</span>
                </div>
                <div class="contact-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ profile.location }}</span>
                </div>
                <div class="social-links">
                  <a [href]="profile.linkedinUrl" target="_blank" *ngIf="profile.linkedinUrl" matTooltip="LinkedIn Profile">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a [href]="profile.githubUrl" target="_blank" *ngIf="profile.githubUrl" matTooltip="GitHub Profile">
                    <i class="fab fa-github"></i>
                  </a>
                  <a [href]="profile.portfolioUrl" target="_blank" *ngIf="profile.portfolioUrl" matTooltip="Portfolio">
                    <i class="fas fa-globe"></i>
                  </a>
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Skills Card -->
            <mat-card class="profile-card skills-card">
              <mat-card-header>
                <mat-card-title>Skills</mat-card-title>
                <button mat-button color="primary" class="card-action-btn">
                  <i class="fas fa-plus"></i> Add Skills
                </button>
              </mat-card-header>
              <mat-card-content>
                <div class="skills-categories">
                  <div class="skill-category" *ngFor="let category of skillCategories">
                    <h4>{{ category }}</h4>
                    <div class="skill-chips">
                      <mat-chip-set>
                        <mat-chip *ngFor="let skill of getSkillsByCategory(category)" [matTooltip]="skill.level + ' level'">
                          {{ skill.name }}
                          <span class="skill-level" [ngClass]="'level-' + skill.level.toLowerCase()"></span>
                        </mat-chip>
                      </mat-chip-set>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- Right Column -->
          <div class="right-column">
            <!-- Experience & Education Tabs -->
            <mat-card class="profile-card experience-card">
              <mat-tab-group animationDuration="400ms" color="accent">
                <mat-tab label="Experience">
                  <div class="tab-content">
                    <div class="timeline">
                      <div class="timeline-item" *ngFor="let exp of profile.experience">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                          <div class="timeline-header">
                            <h3>{{ exp.position }}</h3>
                            <span class="timeline-period">
                              {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
                            </span>
                          </div>
                          <div class="timeline-company">
                            <span class="company-name">{{ exp.company }}</span>
                            <span class="company-location">{{ exp.location }}</span>
                          </div>
                          <div class="timeline-description">
                            <p>{{ exp.description }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-tab>
                
                <mat-tab label="Education">
                  <div class="tab-content">
                    <div class="timeline">
                      <div class="timeline-item" *ngFor="let edu of profile.education">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                          <div class="timeline-header">
                            <h3>{{ edu.degree }}</h3>
                            <span class="timeline-period">
                              {{ edu.startDate }} - {{ edu.endDate }}
                            </span>
                          </div>
                          <div class="timeline-institution">
                            <span>{{ edu.institution }}</span>
                            <span class="education-field">{{ edu.field }}</span>
                          </div>
                          <div class="timeline-description" *ngIf="edu.description">
                            <p>{{ edu.description }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-tab>
              </mat-tab-group>
            </mat-card>

            <!-- Recent Activity Card -->
            <mat-card class="profile-card activity-card">
              <mat-card-header>
                <mat-card-title>Recent Activity</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="activity-timeline">
                  <div class="activity-item" *ngFor="let activity of profile.recentActivity">
                    <div class="activity-icon">
                      <i [class]="activity.icon"></i>
                    </div>
                    <div class="activity-content">
                      <div class="activity-description">{{ activity.description }}</div>
                      <div class="activity-date">{{ activity.date }}</div>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        --primary: #8B5A2B;
        --primary-light: #A67C52;
        --primary-dark: #6B4423;
        --accent: #D2B48C;
        --accent-light: #E6D2B8;
        --accent-dark: #9F8A6E;
        --text-primary: #3E2723;
        --text-secondary: #5D4037;
        --background-light: #F5F0E6;
        --card-bg: #FFFFFF;
        --success: #4CAF50;
        --warning: #FFC107;
        --danger: #F44336;
        --info: #2196F3;
        --light-gray: #EEEEEE;
        --border-radius: 10px;
      }

      .profile-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0;
      }

      /* Header Section */
      .profile-header {
        background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
        padding: 30px;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
        color: white;
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 30px;
      }

      .profile-avatar {
        position: relative;
      }

      .avatar-circle {
        width: 120px;
        height: 120px;
        background: var(--primary-dark);
        border: 4px solid white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-weight: bold;
        color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .availability-badge {
        position: absolute;
        bottom: 5px;
        right: 5px;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .availability-active {
        background-color: var(--success);
        color: white;
      }

      .availability-open {
        background-color: var(--warning);
        color: var(--text-primary);
      }

      .availability-inactive {
        background-color: var(--danger);
        color: white;
      }

      .profile-info {
        flex: 1;
      }

      .profile-info h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }

      .profile-info h2 {
        margin: 5px 0 15px;
        font-size: 18px;
        font-weight: 400;
        opacity: 0.9;
      }

      .profile-stats {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }

      .stat {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
      }

      .profile-actions {
        display: flex;
        gap: 10px;
      }

      .profile-actions button {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      /* Match Score */
      .match-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .score-circle {
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .score-value {
        position: absolute;
        font-size: 28px;
        font-weight: bold;
      }

      .score-chart {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }

      .score-circle-bg {
        fill: none;
        stroke: rgba(255, 255, 255, 0.3);
        stroke-width: 3;
      }

      .score-circle-fill {
        fill: none;
        stroke: white;
        stroke-width: 3;
        stroke-linecap: round;
      }

      /* Content Grid */
      .content-grid {
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        gap: 30px;
      }

      .profile-card {
        background: var(--card-bg);
        border-radius: var(--border-radius);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        margin-bottom: 30px;
        overflow: hidden;
      }

      mat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 16px 0;
      }

      .card-action-btn {
        margin-right: -8px;
      }

      mat-card-title {
        color: var(--primary);
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 0;
      }

      mat-card-content {
        padding: 16px;
      }

      /* Contact Card */
      .contact-card .contact-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        color: var(--text-secondary);
      }

      .contact-item i {
        color: var(--primary);
        width: 20px;
        text-align: center;
      }

      .social-links {
        display: flex;
        gap: 15px;
        margin-top: 20px;
      }

      .social-links a {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--accent-light);
        color: var(--primary);
        border-radius: 50%;
        transition: all 0.3s ease;
      }

      .social-links a:hover {
        background-color: var(--primary);
        color: white;
        transform: translateY(-2px);
      }

      /* Skills Card */
      .skills-categories {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .skill-category h4 {
        margin: 0 0 10px;
        color: var(--text-secondary);
        font-size: 14px;
      }

      .skill-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      mat-chip {
        background-color: var(--accent-light) !important;
        color: var(--text-primary) !important;
        font-weight: 500;
        position: relative;
        padding-right: 28px !important;
      }

      .skill-level {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      .level-beginner {
        background-color: var(--info);
      }

      .level-intermediate {
        background-color: var(--warning);
      }

      .level-expert {
        background-color: var(--success);
      }

      /* Timeline Styling */
      .timeline {
        padding: 20px 0;
      }

      .timeline-item {
        display: flex;
        gap: 20px;
        padding-bottom: 30px;
        position: relative;
      }

      .timeline-item:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 6px;
        top: 20px;
        bottom: 0;
        width: 2px;
        background-color: var(--accent);
      }

      .timeline-marker {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--primary);
        margin-top: 6px;
        z-index: 1;
      }

      .timeline-content {
        flex: 1;
      }

      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .timeline-header h3 {
        margin: 0;
        color: var(--primary);
        font-weight: 600;
        font-size: 16px;
      }

      .timeline-period {
        font-size: 14px;
        color: var(--text-secondary);
        white-space: nowrap;
      }

      .timeline-company, .timeline-institution {
        display: flex;
        justify-content: space-between;
        margin: 5px 0 10px;
        color: var(--text-secondary);
        font-size: 14px;
      }

      .company-name, .education-field {
        font-weight: 500;
      }

      .timeline-description p {
        margin: 0;
        color: var(--text-primary);
        line-height: 1.5;
      }

      /* Activity Card */
      .activity-timeline {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .activity-item {
        display: flex;
        gap: 15px;
      }

      .activity-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--accent-light);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--primary);
      }

      .activity-content {
        flex: 1;
      }

      .activity-description {
        color: var(--text-primary);
        margin-bottom: 5px;
      }

      .activity-date {
        font-size: 12px;
        color: var(--text-secondary);
      }

      /* Tab Styling */
      ::ng-deep .mat-mdc-tab-header {
        border-bottom: 1px solid var(--accent-light);
      }

      ::ng-deep .mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
        color: var(--primary);
        font-weight: 500;
      }

      ::ng-deep .mat-mdc-tab-header .mat-mdc-tab-label-container {
        padding: 0 16px;
      }

      .tab-content {
        padding: 16px;
      }

      /* Responsive Design */
      @media screen and (max-width: 992px) {
        .content-grid {
          grid-template-columns: 1fr;
        }

        .header-content {
          flex-direction: column;
          text-align: center;
        }

        .profile-stats {
          justify-content: center;
        }

        .profile-actions {
          justify-content: center;
        }

        .match-score {
          margin-top: 20px;
        }
      }

      @media screen and (max-width: 768px) {
        .profile-header {
          padding: 20px;
        }

        .timeline-header {
          flex-direction: column;
          gap: 5px;
        }

        .timeline-company, .timeline-institution {
          flex-direction: column;
          gap: 5px;
        }
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  profile!: ProfileData;
  skillCategories: string[] = [];

  constructor() {}

  ngOnInit(): void {
    // Sample data to display (would normally come from a service)
    this.profile = {
      firstName: 'John',
      lastName: 'Doe',
      headline: 'Senior Software Engineer | Full Stack Developer | AI Specialist',
      summary: 'Passionate and dedicated software engineer with over 8 years of experience designing and implementing scalable applications. Specialized in AI and machine learning solutions across multiple industries. Strong advocate for clean code and test-driven development. Looking for challenging opportunities where I can leverage my expertise in creating impactful solutions.',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      currentJobTitle: 'Senior Software Engineer',
      yearsOfExperience: 8,
      preferredJobType: 'full-time',
      preferredLocation: 'San Francisco or Remote',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      githubUrl: 'https://github.com/johndoe',
      portfolioUrl: 'https://johndoe.dev',
      availabilityStatus: 'open_to_opportunities',
      matchScore: 85,
      skills: [
        { name: 'JavaScript', level: 'Expert', category: 'Programming Languages' },
        { name: 'TypeScript', level: 'Expert', category: 'Programming Languages' },
        { name: 'Python', level: 'Intermediate', category: 'Programming Languages' },
        { name: 'Angular', level: 'Expert', category: 'Frameworks' },
        { name: 'React', level: 'Intermediate', category: 'Frameworks' },
        { name: 'Node.js', level: 'Expert', category: 'Frameworks' },
        { name: 'MongoDB', level: 'Intermediate', category: 'Databases' },
        { name: 'PostgreSQL', level: 'Expert', category: 'Databases' },
        { name: 'TensorFlow', level: 'Intermediate', category: 'AI/ML' },
        { name: 'PyTorch', level: 'Beginner', category: 'AI/ML' },
        { name: 'Docker', level: 'Intermediate', category: 'DevOps' },
        { name: 'AWS', level: 'Intermediate', category: 'DevOps' },
      ],
      education: [
        {
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: 'Aug 2014',
          endDate: 'May 2016',
          description: 'Specialized in Artificial Intelligence and Machine Learning. Thesis on Neural Network Optimization.'
        },
        {
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Engineering',
          startDate: 'Aug 2010',
          endDate: 'May 2014',
          description: 'Minor in Mathematics. Dean\'s List all semesters.'
        }
      ],
      experience: [
        {
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          startDate: 'Jan 2020',
          endDate: null,
          location: 'San Francisco, CA',
          description: 'Leading a team of 5 engineers developing cloud-based AI solutions. Architected and implemented a scalable microservices infrastructure using Angular, Node.js, and AWS.'
        },
        {
          company: 'DataDrive Systems',
          position: 'Software Engineer',
          startDate: 'Jun 2016',
          endDate: 'Dec 2019',
          location: 'San Jose, CA',
          description: 'Developed data visualization tools and analytics dashboards using React and D3.js. Improved system performance by 40% through optimization techniques.'
        },
        {
          company: 'Innovate Labs',
          position: 'Software Development Intern',
          startDate: 'May 2015',
          endDate: 'Aug 2015',
          location: 'Mountain View, CA',
          description: 'Assisted in developing RESTful APIs and implemented front-end components using Angular.js.'
        }
      ],
      recentActivity: [
        {
          type: 'application',
          description: 'Applied for Senior Full Stack Developer at CloudTech Solutions',
          date: '2 days ago',
          icon: 'fas fa-paper-plane'
        },
        {
          type: 'skill',
          description: 'Added new skill: GraphQL',
          date: '1 week ago',
          icon: 'fas fa-plus-circle'
        },
        {
          type: 'interview',
          description: 'Completed technical interview with Nexus Software',
          date: '2 weeks ago',
          icon: 'fas fa-comments'
        },
        {
          type: 'profile',
          description: 'Updated professional summary',
          date: '3 weeks ago',
          icon: 'fas fa-user-edit'
        }
      ]
    };

    // Extract unique skill categories
    this.skillCategories = [...new Set(this.profile.skills.map(skill => skill.category))];
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.profile.skills.filter(skill => skill.category === category);
  }

  getAvailabilityClass(status: string): string {
    switch (status) {
      case 'actively_looking':
        return 'availability-active';
      case 'open_to_opportunities':
        return 'availability-open';
      case 'not_available':
        return 'availability-inactive';
      default:
        return '';
    }
  }

  getAvailabilityText(status: string): string {
    switch (status) {
      case 'actively_looking':
        return 'Actively Looking';
      case 'open_to_opportunities':
        return 'Open to Opportunities';
      case 'not_available':
        return 'Not Available';
      default:
        return status;
    }
  }
}