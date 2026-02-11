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

export interface Profile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role?: string;
    created_at: string;
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
