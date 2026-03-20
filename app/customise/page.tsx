'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import CakePreview from '@/components/customiser/CakePreview'
import OrderSummary from '@/components/customiser/OrderSummary'
import StepFlavour from '@/components/customiser/StepFlavour'
import StepSize from '@/components/customiser/StepSize'
import StepAddons from '@/components/customiser/StepAddons'
import StepNotes from '@/components/customiser/StepNotes'
import { useCustomiserStore } from '@/store/useCustomiserStore'

const STEPS = [
  { id: 1, label: 'Size',     component: StepSize },
  { id: 2, label: 'Flavour',  component: StepFlavour },
  { id: 3, label: 'Add-Ons',  component: StepAddons },
  { id: 4, label: 'Notes',    component: StepNotes },
]


export default function CustomisePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalPrice = useCustomiserStore((s) => s.totalPrice)
  const reset = useCustomiserStore((s) => s.reset)

  const StepComponent = STEPS[currentStep].component

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1)
      setCurrentStep((s) => s + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((s) => s - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setShowToast(true)
  }

  const handleStartOver = () => {
    reset()
    setSubmitted(false)
    setCurrentStep(0)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl border border-ink/8 shadow-lg p-10 sm:p-16 max-w-lg w-full text-center"
        >
          <div className="text-6xl mb-6">🎂</div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
            Order placed!
          </h1>
          <p className="text-muted font-sans text-sm leading-relaxed mb-8">
            Your custom cake order has been received. We&apos;ll be in touch within 24 hours to confirm
            your order and discuss any details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleStartOver} variant="primary">
              Order Another Cake
            </Button>
            <Button onClick={() => window.history.back()} variant="secondary">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-ink">Build Your Cake</h1>
          <p className="text-muted font-sans text-sm mt-1">
            Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].label}
          </p>
        </div>

        {/* Step indicator + Reset */}
        <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-1">
          {STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => {
                setDirection(i > currentStep ? 1 : -1)
                setCurrentStep(i)
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-all ${
                i === currentStep
                  ? 'bg-rose text-white shadow-sm'
                  : i < currentStep
                  ? 'bg-rose/20 text-rose'
                  : 'bg-ink/8 text-muted hover:bg-cream'
              }`}
            >
              {i < currentStep && <CheckCircle2 className="w-3 h-3" />}
              {step.label}
            </button>
          ))}
          <button
            onClick={() => { reset(); setCurrentStep(0); setDirection(1) }}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans whitespace-nowrap text-muted hover:text-ink hover:bg-cream transition-all flex-shrink-0"
            title="Reset all selections"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Main layout: form left, preview right */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form column (60%) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Step content */}
            <div className="bg-white rounded-2xl border border-ink/8 shadow-sm p-6 sm:p-8 min-h-[400px] overflow-hidden">
              <motion.div
                key={currentStep}
                initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <StepComponent />
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="secondary"
                onClick={goBack}
                disabled={currentStep === 0}
                className="disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button variant="primary" onClick={goNext}>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit}>
                  Place Order · ${totalPrice}
                </Button>
              )}
            </div>
          </div>

          {/* Preview column (40%) — sticky on desktop */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Preview on mobile: above form; on desktop: sticky right */}
              <CakePreview />
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>

      <Toast
        message="Order placed! 🎂"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        variant="success"
      />
    </div>
  )
}
