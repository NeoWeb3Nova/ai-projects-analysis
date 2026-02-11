'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const caseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, numbers, and hyphens only'),
    summary: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    tags: z.string().optional(), // We'll input tags as comma-separated string
    published_at: z.string().optional(), // Or boolean? DB uses timestamp.
    is_published: z.boolean().default(false),
});

type CaseFormValues = z.infer<typeof caseSchema>;

interface CaseFormProps {
    initialData?: any; // strict type ideally
    isEditing?: boolean;
}

export function CaseForm({ initialData, isEditing = false }: CaseFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [networkError, setNetworkError] = useState<string | null>(null);

    const defaultValues: Partial<CaseFormValues> = initialData ? {
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags,
        is_published: !!initialData.published_at,
    } : {
        title: '',
        slug: '',
        summary: '',
        content: '',
        category: '',
        tags: '',
        is_published: false,
    };

    const form = useForm<CaseFormValues>({
        resolver: zodResolver(caseSchema) as any, // Cast to any to avoid strict type mismatch with optional fields
        defaultValues,
    });

    const onSubmit = async (values: CaseFormValues) => {
        setIsLoading(true);
        setNetworkError(null);

        // Transform tags to array
        const payload = {
            ...values,
            tags: values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
            published_at: values.is_published ? (initialData?.published_at || new Date().toISOString()) : null,
        };
        // Remove is_published helper
        delete (payload as any).is_published;

        try {
            const url = isEditing ? `/api/admin/cases/${initialData.id}` : '/api/admin/cases';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            router.push('/admin/cases');
            router.refresh();
        } catch (error: any) {
            console.error(error);
            setNetworkError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                {networkError && (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                        {networkError}
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Case Study Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder="case-study-slug" {...field} />
                            </FormControl>
                            <FormDescription>
                                URL-friendly identifier.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="SaaS, AI, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="React, Next.js, Supabase" {...field} />
                                </FormControl>
                                <FormDescription>Comma-separated</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief summary..." className="h-20" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content (Markdown)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="# Title\n\nContent..." className="h-64 font-mono" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_published"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Published
                                </FormLabel>
                                <FormDescription>
                                    This case will be visible to the public.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? 'Update Case' : 'Create Case'}
                </Button>
            </form>
        </Form>
    );
}
