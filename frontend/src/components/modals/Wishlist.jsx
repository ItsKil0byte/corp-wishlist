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
      <DialogContent className="sm:max-w-[425px] rounded-lg">
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
              className="rounded-lg border-2 h-10 border-gray-300 shadow-xs"
            />

            <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="size-10 rounded-full p-0 flex items-center justify-center border-2 border-gray-300 hover:border-main-theme-border transition-colors hover:bg-main-theme-lite shadow-sm shrink-0"
                >
                  {icon}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit p-2 rounded-lg shadow-xs border border-gray-300"
                align="end"
              >
                <div className="grid grid-cols-4 gap-2">
                  {emojiSets.wishlist.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      className={`size-10 rounded-full p-0 flex items-center justify-center ${
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
        <DialogFooter className="flex gap-2 sm:gap-4 sm:flex-row pt-0 bg-white border-none">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full sm:flex-1 h-12 text-gray-900 font-semibold text-base border-2 border-gray-200 hover:bg-gray-200 shadow-xs rounded-lg transition-all"
          >
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:flex-1 sm:w-auto bg-main-theme hover:bg-main-theme-hover h-12 px-4 text-gray-900 border-2 border-main-theme-border font-bold rounded-lg transition-all text-lg shadow-xs"
          >
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
