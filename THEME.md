# Design System - WDP Mobile

## 🎨 Color Palette

### Primary Colors
- **Primary**: `#007AFF` - Xanh dương tươi (nút chính, links, highlights)
  - `primary-light`: `#5AC8FA`
  - `primary-dark`: `#005FCC`
  - Shades: 50-900

### Secondary Colors
- **Secondary**: `#5AC8FA` - Xanh dương nhạt (secondary actions)
  - `secondary-light`: `#8DDBFC`
  - `secondary-dark`: `#27B5F8`
  - Shades: 50-900

### Background & Surface
- **Background**: `#FFFFFF` - Trắng (màu nền chính)
  - `background-light`: `#FAFAFA`
- **Surface**: `#F2F4F7` - Xám nhạt (cards, inputs)
  - `surface-light`: `#F9FAFB`
  - `surface-dark`: `#E5E7EB`

### Text Colors
- **Text Primary**: `#1C1C1E` - Xám đậm (text chính)
- **Text Secondary**: `#6B7280` - Xám vừa (text phụ)
- **Text Light**: `#9CA3AF` - Xám nhạt (placeholders)
- **Text Muted**: `#D1D5DB` - Xám rất nhạt (disabled)

### Accent
- **Accent**: `#FFB84D` - Vàng cam sáng (highlights, badges)
  - `accent-light`: `#FFCB7A`
  - `accent-dark`: `#FF9F1A`
  - Shades: 50-900

## 📝 Typography

### Font Family
- **Primary**: Inter (sans-serif)
- **Alternative**: Poppins (sans-serif)

### Font Weights
- Light: 300
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

### Font Sizes
- `2xs`: 10px
- `xs`: 12px
- `sm`: 14px
- `base`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px

## 🎯 Usage Examples

### Buttons
```tsx
// Primary Button
<TouchableOpacity className="bg-primary rounded-lg py-4 px-6 shadow-button">
  <Text className="text-white font-inter font-semibold">Đăng nhập</Text>
</TouchableOpacity>

// Secondary Button
<TouchableOpacity className="bg-secondary rounded-lg py-4 px-6 shadow-card">
  <Text className="text-white font-inter font-semibold">Hủy</Text>
</TouchableOpacity>

// Accent Button
<TouchableOpacity className="bg-accent rounded-lg py-3 px-5">
  <Text className="text-white font-inter font-medium">Đăng xuất</Text>
</TouchableOpacity>
```

### Cards
```tsx
<View className="bg-white rounded-xl p-6 shadow-card">
  <Text className="text-text-primary font-inter font-bold text-2xl">
    Tiêu đề
  </Text>
  <Text className="text-text-secondary font-inter mt-2">
    Nội dung card
  </Text>
</View>
```

### Inputs
```tsx
<TextInput
  className="bg-surface border border-surface-dark rounded-lg px-4 py-3.5 font-inter text-text-primary"
  placeholder="Nhập email"
  placeholderTextColor="#9CA3AF"
/>
```

### Text Styles
```tsx
// Heading
<Text className="text-text-primary font-inter font-bold text-2xl">
  Tiêu đề
</Text>

// Body
<Text className="text-text-secondary font-inter">
  Nội dung
</Text>

// Caption
<Text className="text-text-light font-inter text-sm">
  Ghi chú
</Text>
```

## 🔲 Spacing & Layout

### Border Radius
- `sm`: 8px
- Default: 12px
- `lg`: 16px
- `xl`: 20px
- `2xl`: 24px
- `full`: 9999px

### Shadows
- `shadow-sm`: Subtle shadow
- `shadow`: Default card shadow
- `shadow-md`: Medium shadow
- `shadow-lg`: Large shadow
- `shadow-card`: Card shadow (0 2px 6px rgba(0,0,0,0.08))
- `shadow-button`: Button shadow (0 2px 4px rgba(0,122,255,0.2))

### Spacing
- Standard: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- Custom: 18 (4.5rem), 22 (5.5rem)

## 🎨 Design Principles

1. **Sáng sủa**: Sử dụng background trắng, màu sắc tươi sáng
2. **Hiện đại**: Border radius lớn (12-20px), shadows nhẹ nhàng
3. **Dễ đọc**: Text contrast cao, font Inter rõ ràng
4. **Nhất quán**: Sử dụng color palette và spacing system thống nhất
5. **Accessible**: Đảm bảo contrast ratio đạt chuẩn WCAG

## 🚀 Quick Start

```tsx
import '@/global.css';

// Sử dụng theme colors
<View className="bg-primary">...</View>
<Text className="text-text-primary font-inter">...</Text>

// Sử dụng shadows
<View className="shadow-card">...</View>

// Sử dụng spacing
<View className="p-6 gap-4">...</View>
```
