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
  const [color, setColor] = useState("#defaf5");
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
        setColor("#defaf5");
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
                className="rounded-lg border-2 h-10 border-gray-200"
              />
            </div>
            <div className="w-12">
              <Label htmlFor="wish-color" className="mb-2 block">
                Цвет
              </Label>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 border-2 border-gray-200 rounded-lg"
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
              className="rounded-lg border-2 min-h-48 border-gray-200 field-sizing-fixed resize-none"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-4 pt-0 bg-white border-none sm:flex-col">
          <div className="flex gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-gray-200 text-gray-900 text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-main-theme border-2 border-main-theme-border text-gray-900 font-bold text-base px-4 h-12 hover:brightness-95 hover:scale-105 transition-all"
            >
              {isEdit ? "Сохранить" : "Добавить"}
            </Button>
          </div>
          {isEdit && onDelete && (
            <Button
              onClick={onDelete}
              className="w-full h-12 bg-red-500 text-gray-900 font-bold border-2 text-base border-red-700 rounded-lg hover:brightness-95 hover:scale-105 transition-all"
            >
              Удалить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
