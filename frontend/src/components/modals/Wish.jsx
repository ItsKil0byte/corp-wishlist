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
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
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
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 hover:brightness-95 text-gray-900 border-2 border-red-700 p-1.5 rounded-md hover:scale-105 transition-all"
                >
                  <X className="size-4 text-white" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 border-2 border-dashed bg-white border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:hover:brightness-95 transition-all hover:scale-105"
              >
                <ImagePlus className="size-8 mb-1 text-gray-400" />
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
