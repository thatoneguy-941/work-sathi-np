import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface MobileTableProps {
  data: any[];
  selectedItems: string[];
  onSelectItem: (id: string, checked: boolean) => void;
  onItemAction: (action: string, item: any) => void;
  renderItem: (item: any) => React.ReactNode;
}

const MobileOptimizedTable = ({
  data,
  selectedItems,
  onSelectItem,
  onItemAction,
  renderItem,
}: MobileTableProps) => {
  return (
    <div className="block md:hidden space-y-4">
      {data.map((item) => (
        <Card key={item.id} className="p-4">
          <CardContent className="p-0">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) => onSelectItem(item.id, !!checked)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                {renderItem(item)}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onItemAction('edit', item)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onItemAction('delete', item)}>
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onItemAction('email', item)}>
                    Send Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MobileOptimizedTable;