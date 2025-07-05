import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Mail, CheckCircle, XCircle } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

interface BulkActionsProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: (checked: boolean) => void;
  onBulkDelete: () => void;
  onBulkEmail?: () => void;
  onBulkStatusUpdate?: (status: string) => void;
  showEmailAction?: boolean;
  showStatusActions?: boolean;
}

const BulkActions = ({
  selectedItems,
  totalItems,
  onSelectAll,
  onBulkDelete,
  onBulkEmail,
  onBulkStatusUpdate,
  showEmailAction = false,
  showStatusActions = false,
}: BulkActionsProps) => {
  if (selectedItems.length === 0) return null;

  const allSelected = selectedItems.length === totalItems;
  const someSelected = selectedItems.length > 0 && selectedItems.length < totalItems;

  return (
    <div className="flex items-center gap-4 p-4 bg-muted/50 border-b">
      <Checkbox
        checked={allSelected}
        onCheckedChange={(checked) => onSelectAll(!!checked)}
      />
      
      <span className="text-sm font-medium">
        {selectedItems.length} of {totalItems} selected
      </span>
      
      <div className="flex items-center gap-2 ml-auto">
        {showEmailAction && onBulkEmail && (
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkEmail}
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </Button>
        )}
        
        {showStatusActions && onBulkStatusUpdate && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkStatusUpdate('Paid')}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Paid
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkStatusUpdate('Unpaid')}
              className="flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Mark Unpaid
            </Button>
          </>
        )}
        
        <ConfirmDialog
          title="Delete Selected Items"
          description={`Are you sure you want to delete ${selectedItems.length} selected items? This action cannot be undone.`}
          onConfirm={onBulkDelete}
          destructive
        >
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </Button>
        </ConfirmDialog>
      </div>
    </div>
  );
};

export default BulkActions;