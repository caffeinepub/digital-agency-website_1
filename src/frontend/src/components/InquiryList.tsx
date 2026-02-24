import { useState } from 'react';
import type { Inquiry } from '../backend';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InquiryListProps {
  inquiries: Array<[bigint, Inquiry]>;
  onDelete: (id: bigint) => Promise<void>;
  isDeleting: boolean;
}

export default function InquiryList({ inquiries, onDelete, isDeleting }: InquiryListProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<[bigint, Inquiry] | null>(null);

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No inquiries found
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Website Type</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map(([id, inquiry]) => (
              <TableRow key={id.toString()}>
                <TableCell className="font-medium">{inquiry.fullName}</TableCell>
                <TableCell>{inquiry.emailAddress}</TableCell>
                <TableCell>{inquiry.companyName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{inquiry.websiteType}</Badge>
                </TableCell>
                <TableCell>{inquiry.budget}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInquiry([id, inquiry])}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              Full details of the contact form submission
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-sm">{selectedInquiry[1].fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{selectedInquiry[1].emailAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm">{selectedInquiry[1].phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="text-sm">{selectedInquiry[1].companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Website Type</p>
                  <p className="text-sm">{selectedInquiry[1].websiteType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget</p>
                  <p className="text-sm">{selectedInquiry[1].budget}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Deadline</p>
                  <p className="text-sm">{selectedInquiry[1].deadline}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Features</p>
                <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">
                  {selectedInquiry[1].features}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</p>
                <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">
                  {selectedInquiry[1].additionalNotes}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
