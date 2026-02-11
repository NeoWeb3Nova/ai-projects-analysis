'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Plus, ExternalLink } from 'lucide-react';

interface Case {
    id: string;
    title: string;
    category: string;
    published_at: string | null;
    slug: string;
}

interface CasesTableProps {
    initialCases: Case[];
}

export function CasesTable({ initialCases }: CasesTableProps) {
    const [cases, setCases] = useState<Case[]>(initialCases);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this case?')) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/cases/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete');

            setCases(cases.filter(c => c.id !== id));
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error deleting case');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-heading font-bold">Cases</h2>
                <Link href="/admin/cases/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create New
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cases.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No cases found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            cases.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">
                                        {c.title}
                                        <div className="text-xs text-muted-foreground">{c.slug}</div>
                                    </TableCell>
                                    <TableCell>{c.category}</TableCell>
                                    <TableCell>
                                        {c.published_at ? new Date(c.published_at).toLocaleDateString() : 'Draft'}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/project/${c.slug}`} target="_blank">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/cases/${c.id}`}>
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(c.id)}
                                            disabled={isLoading}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
