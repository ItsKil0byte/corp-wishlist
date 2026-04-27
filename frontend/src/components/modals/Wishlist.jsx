import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";
import emojiSets from "@/data/emoji_sets.json";

export default function Wishlist({
  isOpen,
  onClose,
  onSave,
  onDelete,
  data = null,
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [icon, setIcon] = useState("🎁");

  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const isEdit = !!data;

  useEffect(() => {
    if (isOpen) {
      if (data) {
        setName(data.name);
        setColor(data.color);
        setIcon(data.icon);
      } else {
        setName("");
        setColor("#ffffff");
        setIcon("🎁");
      }
    }
  }, [isOpen, data]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, color, icon });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] ring-0 border-2 rounded-lg p-6 border-gray-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Редактировать вишлист" : "Создать новый вишлист"}
          </DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="wishlist-name" className="mb-2">
            Название
          </Label>
          <div className="flex items-center gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: День рождения, Новый год и т.д."
              className="rounded-lg border-2 h-12 border-gray-200"
            />

            <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="size-10 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-main-theme-border transition-colors hover:bg-main-theme-lite shrink-0"
                >
                  {icon}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit p-2 rounded-lg ring-0 border-2 border-gray-200"
                align="end"
              >
                <div className="grid grid-cols-4 gap-2">
                  {emojiSets.wishlist.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      className={`size-10 rounded-full flex items-center justify-center ${
                        icon === emoji
                          ? "border-2 border-main-theme-border shadow-sm"
                          : "border-2 border-gray-300 hover:border-main-theme-border hover:bg-main-theme-lite transition-colors"
                      }`}
                      onClick={() => {
                        setIcon(emoji);
                        setIconPickerOpen(false);
                      }}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
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
