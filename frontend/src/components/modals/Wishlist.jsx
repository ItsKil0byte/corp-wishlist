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
      <DialogContent className="rounded-lg border-2 border-gray-300 p-6 ring-0 sm:max-w-[425px]">
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
              className="h-12 rounded-lg border-2 border-gray-200"
            />

            <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:border-main-theme-border hover:bg-main-theme-lite flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 transition-colors"
                >
                  {icon}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit rounded-lg border-2 border-gray-200 p-2 ring-0"
                align="end"
              >
                <div className="grid grid-cols-4 gap-2">
                  {emojiSets.wishlist.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      className={`flex size-10 items-center justify-center rounded-full ${
                        icon === emoji
                          ? "border-main-theme-border border-2 shadow-sm"
                          : "hover:border-main-theme-border hover:bg-main-theme-lite border-2 border-gray-300 transition-colors"
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
        <DialogFooter className="flex flex-col gap-4 border-none bg-white pt-0 sm:flex-col">
          <div className="flex gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="h-12 flex-1 border-2 border-gray-200 px-4 text-base text-gray-900 transition-all hover:scale-105 hover:brightness-95"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="bg-main-theme border-main-theme-border h-12 flex-1 border-2 px-4 text-base font-bold text-gray-900 transition-all hover:scale-105 hover:brightness-95"
            >
              {isEdit ? "Сохранить" : "Добавить"}
            </Button>
          </div>
          {isEdit && onDelete && (
            <Button
              onClick={onDelete}
              className="h-12 w-full rounded-lg border-2 border-red-700 bg-red-500 text-base font-bold text-gray-900 transition-all hover:scale-105 hover:brightness-95"
            >
              Удалить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
