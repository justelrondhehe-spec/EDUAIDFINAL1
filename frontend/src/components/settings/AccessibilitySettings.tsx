import { ArrowLeft, Type, Eye, Volume2, Mouse, Palette, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface AccessibilitySettingsProps {
  onBack: () => void;
}

export function AccessibilitySettings({ onBack }: AccessibilitySettingsProps) {
  const { settings, updateSettings } = useAccessibility();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-slate-800 dark:text-slate-100">Accessibility Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Customize your learning experience</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Visual Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Visual Settings</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Adjust display preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Increase contrast for better visibility</p>
              </div>
              <Switch 
                id="high-contrast" 
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Use dark theme throughout the app</p>
              </div>
              <Switch 
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSettings({ darkMode: checked })}
              />
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Text Size: {settings.textSize}%
              </Label>
              <Slider 
                value={[settings.textSize]} 
                onValueChange={([value]) => updateSettings({ textSize: value })}
                max={100} 
                step={1} 
              />
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Small (85%)</span>
                <span>Large (150%)</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Font Style</Label>
              <Select 
                value={settings.fontStyle}
                onValueChange={(value: any) => updateSettings({ fontStyle: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="dyslexic">Dyslexic Friendly</SelectItem>
                  <SelectItem value="sans">Sans Serif</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Audio Settings</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Configure audio features</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="screen-reader">Screen Reader Support</Label>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Enable screen reader compatibility</p>
              </div>
              <Switch id="screen-reader" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="text-to-speech">Text-to-Speech</Label>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Read content aloud automatically</p>
              </div>
              <Switch id="text-to-speech" />
            </div>

            <div className="space-y-3">
              <Label>Voice Speed</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Mouse className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Interaction Settings</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Customize interaction methods</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="keyboard-nav">Keyboard Navigation</Label>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Navigate using keyboard shortcuts</p>
              </div>
              <Switch id="keyboard-nav" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="animations">Reduce Animations</Label>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Minimize motion effects</p>
              </div>
              <Switch 
                id="animations"
                checked={settings.reduceAnimations}
                onCheckedChange={(checked) => updateSettings({ reduceAnimations: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="focus-indicators">Enhanced Focus Indicators</Label>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Show clearer focus highlights</p>
              </div>
              <Switch id="focus-indicators" />
            </div>
          </div>
        </div>

        {/* Color Blindness */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100">Color Adjustments</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Optimize colors for visibility</p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Color Blind Mode</Label>
            <Select defaultValue="none">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
