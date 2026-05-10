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

export default function GroupModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  data = null,
}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🥳");
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const isEdit = !!data;

  useEffect(() => {
    if (isOpen) {
      if (data) {
        setName(data.name);
        setIcon(data.icon || "🥳");
      } else {
        setName("");
        setIcon("🥳");
      }
    }
  }, [isOpen, data]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, icon });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-lg border-2 border-gray-300 p-6 ring-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Редактировать группу" : "Создать новую группу"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label
              htmlFor="group-name"
              className="mb-2 block font-medium text-gray-900"
            >
              Название группы
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="group-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Отдел разработки, Семья..."
                className="focus-visible:ring-main-theme h-12 rounded-lg border-2 border-gray-200"
              />

              <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="hover:border-main-theme-border hover:bg-main-theme-lite flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-gray-200 text-xl transition-colors"
                  >
                    {icon}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-fit rounded-lg border-2 border-gray-200 bg-white p-2 ring-0"
                  align="end"
                >
                  <div className="grid grid-cols-4 gap-2">
                    {emojiSets.group.map((emoji) => (
                      <Button
                        key={emoji}
                        variant="ghost"
                        className={`flex size-10 items-center justify-center rounded-full text-xl ${
                          icon === emoji
                            ? "border-main-theme-border bg-main-theme-lite border-2 shadow-sm"
                            : "hover:border-main-theme-border hover:bg-main-theme-lite border-2 border-gray-100 transition-colors"
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
        </div>

        <DialogFooter className="flex flex-col gap-4 border-none bg-white pt-4 sm:flex-col">
          <div className="flex w-full gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="h-12 flex-1 border-2 border-gray-200 px-4 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim()}
              className="bg-main-theme border-main-theme-border h-12 flex-1 border-2 px-4 text-base font-bold text-gray-900 transition-all hover:scale-[1.02] hover:brightness-95 disabled:opacity-50"
            >
              {isEdit ? "Сохранить" : "Создать"}
            </Button>
          </div>

          {isEdit && onDelete && (
            <Button
              onClick={onDelete}
              className="h-12 w-full rounded-lg border-2 border-red-600 bg-red-500 font-bold text-white transition-all hover:bg-red-600"
            >
              Удалить группу
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
