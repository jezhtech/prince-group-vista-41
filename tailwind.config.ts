import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New modern color palette based on the reference images
				"prince-green": {
					DEFAULT: "#4eb4a7",
					light: "#85cbc3",
					dark: "#60afb4",
					50: "#f1f9f8",
					100: "#ddf0ed",
					200: "#bfe3dd",
					300: "#93cdc4",
					400: "#60afb4",
					500: "#4eb4a7",
					600: "#399287",
					700: "#31776f",
					800: "#2c615b",
					900: "#28514c"
				},
				"prince-accent": "#08A045",
				"prince-light": "#E4F5ED",
				"prince-dark": "#053B29",
				"prince-gold": "#D4AF37",
				"prince-navy": "#172B4D",
				"prince-gray": "#F4F5F7",
				"prince-blue": "#0747A6",
				// New modern UI color palette
				"ui-blue": {
					50: "#EEF5FF",
					100: "#D5E5FF",
					200: "#B1CCFF",
					300: "#6EA1FF", 
					400: "#4C83FB", // Main blue from reference
					500: "#3366FF",
					600: "#1D4ED8",
					700: "#1E40AF",
					800: "#1E3A8A",
					900: "#172554"
				},
				"ui-green": {
					50: "#ECFDF5",
					100: "#D1FAE5",
					200: "#99F6E4",
					300: "#0BD488", // Accent green from reference
					400: "#34D399",
					500: "#10B981",
					600: "#059669",
					700: "#047857",
					800: "#065F46",
					900: "#064E3B"
				},
				"ui-cyan": {
					50: "#ECFEFF",
					100: "#CFFAFE",
					200: "#A5F3FC",
					300: "#67E8F9",
					400: "#22D3EE",
					500: "#06B6D4",
					600: "#0891B2",
					700: "#0E7490",
					800: "#155E75",
					900: "#164E63"
				},
				"ui-gray": {
					50: "#F9FAFB",
					100: "#F3F4F6",
					200: "#E5E7EB", 
					300: "#D1D5DB",
					400: "#9CA3AF",
					500: "#6B7280",
					600: "#4B5563",
					700: "#374151",
					800: "#1F2937",
					900: "#111827"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'slide-in-right': {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" }
				},
				'slide-in-left': {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" }
				},
				'slide-up': {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				'zoom-in': {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				'bounce-light': {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" }
				},
				'float': {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" }
				},
				'pulse-light': {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.7" }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'zoom-in': 'zoom-in 0.5s ease-out',
				'bounce-light': 'bounce-light 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-light': 'pulse-light 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
