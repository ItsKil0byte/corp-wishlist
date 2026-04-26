import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Wish({
  isOpen,
  onClose,
  onSave,
  onDelete,
  data = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");
  const isEdit = !!data;

  useEffect(() => {
    if (isOpen) {
      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setColor(data.color);
      } else {
        setTitle("");
        setDescription("");
        setColor("#ffffff");
      }
    }
  }, [isOpen, data]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title, description, color });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Редактировать желание" : "Добавить желание"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="wish-title" className="mb-2 block">
                Название
              </Label>
              <Input
                value={title}
                placeholder="Например: iPhone 17 Pro и т.д."
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg border-2 h-10 border-gray-300 shadow-xs"
              />
            </div>
            <div className="w-16">
              <Label htmlFor="wish-color" className="mb-2 block">
                Цвет
              </Label>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 border-2 border-gray-300 rounded-lg shadow-xs"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="wish-description" className="mb-2 block">
              Описание
            </Label>
            <Textarea
              value={description}
              placeholder="Дополнительные детали, ссылки и т.д."
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg border-2 min-h-32 border-gray-300 shadow-xs"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-4 pt-0 bg-white border-none sm:flex-col">
          <div className="flex gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 text-gray-900 font-semibold text-base border-2 border-gray-200 hover:bg-gray-100 shadow-xs rounded-lg transition-all"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg shadow-xs"
            >
              {isEdit ? "Сохранить" : "Добавить"}
            </Button>
          </div>
          {isEdit && onDelete && (
            <Button
              onClick={onDelete}
              className="w-full h-12 bg-red-500 hover:bg-red-600 text-gray-900 font-bold border-2 border-red-600 rounded-lg shadow-xs transition-all"
            >
              Удалить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
