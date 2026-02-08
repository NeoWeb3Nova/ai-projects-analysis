export interface CaseStudy {
    slug: string;
    title: string;
    summary: string;
    category: string;
    monetization: string;
    stage: string;
    publishedAt: string;
    tags: string[];
    cover?: string;
    content?: string;
}

export interface Bookmark {
    id: string;
    user_id: string;
    case_slug: string;
    created_at: string;
}

export interface ConsultationRequest {
    name: string;
    email: string;
    company?: string;
    message: string;
}
