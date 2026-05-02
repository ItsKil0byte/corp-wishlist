import { useEffect, useRef, useState } from "react";
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
import { ImagePlus, X } from "lucide-react";

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageCleared, setIsImageCleared] = useState(false);
  const fileInputRef = useRef(null);

  // TODO: Рефакторить.
  const API_BASE_URL =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:8080";

  const isEdit = !!data;

  useEffect(() => {
    if (isOpen) {
      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setColor(data.color);

        if (data.imageUrls && data.imageUrls.length > 0) {
          setImagePreview(`${API_BASE_URL}${data.imageUrls[0]}`);
        } else {
          setImagePreview(null);
        }
      } else {
        setTitle("");
        setDescription("");
        setColor("#defaf5");
        setImagePreview(null);
      }
      setImageFile(null);
      setIsImageCleared(false);
    }
  }, [isOpen, data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Временная ссылка
      setIsImageCleared(false);
    }
  };

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title, description, color, imageFile, isImageCleared });
      onClose();
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setIsImageCleared(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="mx-auto w-full max-w-md rounded-lg bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Редактировать желание" : "Добавить желание"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label className="mb-2 block">Обложка</Label>
            <Input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            {imagePreview ? (
              <div className="group relative h-32 w-full overflow-hidden rounded-lg border-2 border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <Button
                  onClick={clearImage}
                  className="absolute top-2 right-2 rounded-md border-2 border-red-700 bg-red-500 p-1.5 text-gray-900 transition-all hover:scale-105 hover:brightness-95"
                >
                  <X className="size-4 text-white" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="flex h-24 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white text-gray-500 transition-all hover:scale-105 hover:hover:brightness-95"
              >
                <ImagePlus className="mb-1 size-8 text-gray-400" />
                <span className="text-sm font-medium">Загрузить фото</span>
              </Button>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="wish-title" className="mb-2 block">
                Название
              </Label>
              <Input
                value={title}
                placeholder="Например: iPhone 17 Pro и т.д."
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 rounded-lg border-2 border-gray-200"
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
                className="h-10 w-full rounded-lg border-2 border-gray-200"
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
              className="field-sizing-fixed min-h-48 resize-none rounded-lg border-2 border-gray-200"
            />
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
