import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Check, X } from "lucide-react";
import UserInfoService from "@/services/UserInfoService";
import toast from "react-hot-toast";

export default function InfoSection({ title, value, type, user, fetchUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value || "");

  const handleSave = async () => {
    const tId = toast.loading("Сохранение...");
    try {
      await UserInfoService.updateInfo({ ...user, [type]: text });
      await fetchUser();
      setIsEditing(false);
      toast.success(`${title} обновлены!`, { id: tId });
    } catch (e) {
      toast.error("Ошибка при сохранении", { id: tId });
    }
  };

  return (
    <Card className="group relative overflow-hidden border-2 border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-bold text-gray-900">
          {title}
        </CardTitle>

        {!isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="hover:bg-main-theme/10 text-main-theme"
          >
            <Pencil className="size-4" />
          </Button>
        ) : (
          <div className="animate-in fade-in zoom-in flex gap-1 duration-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsEditing(false);
                setText(value || "");
              }}
              className="text-gray-400"
            >
              <X className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="text-green-600 hover:bg-green-50 hover:text-green-700"
            >
              <Check className="size-4" />
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="focus-visible:ring-main-theme min-h-32 resize-none border-2 border-gray-200"
            placeholder={`Расскажите про ваши ${title.toLowerCase()}...`}
          />
        ) : (
          <p
            className={`text-base leading-relaxed whitespace-pre-wrap ${!value ? "text-gray-400 italic" : "text-gray-600"}`}
          >
            {value || "Не указано (нажмите на карандаш, чтобы добавить)"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
