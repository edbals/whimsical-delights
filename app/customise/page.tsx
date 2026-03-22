'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import CakePreview from '@/components/customiser/CakePreview'
import OrderSummary from '@/components/customiser/OrderSummary'
import OrderAgreementModal from '@/components/customiser/OrderAgreementModal'
import StepFlavour from '@/components/customiser/StepFlavour'
import StepFilling from '@/components/customiser/StepFilling'
import StepSize from '@/components/customiser/StepSize'
import StepAddons from '@/components/customiser/StepAddons'
import StepNotes from '@/components/customiser/StepNotes'
import { useCustomiserStore } from '@/store/useCustomiserStore'

const STEPS = [
  { id: 1, label: 'Size',     component: StepSize },
  { id: 2, label: 'Flavour',  component: StepFlavour },
  { id: 3, label: 'Filling',  component: StepFilling },
  { id: 4, label: 'Add-Ons',  component: StepAddons },
  { id: 5, label: 'Notes',    component: StepNotes },
]


export default function CustomisePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showAgreement, setShowAgreement] = useState(false)
  const totalPrice = useCustomiserStore((s) => s.totalPrice)
  const depositAmount = useCustomiserStore((s) => s.depositAmount)
  const balanceDue = useCustomiserStore((s) => s.balanceDue)
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

  const handlePlaceOrder = () => {
    setShowAgreement(true)
  }

  const handleConfirmOrder = () => {
    setShowAgreement(false)
    setSubmitted(true)
    setShowToast(true)
  }

  const handleStartOver = () => {
    reset()
    setSubmitted(false)
    setCurrentStep(0)
  }

  const hasDeposit = depositAmount > 0

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-ink/8 shadow-lg p-8 sm:p-10 lg:p-16 max-w-lg w-full text-center"
        >
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🎂</div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink mb-2 sm:mb-3">
            Order placed!
          </h1>
          <p className="text-muted font-sans text-sm leading-relaxed mb-4">
            Your custom cake order has been received. We&apos;ll be in touch within 24 hours to confirm
            your order and discuss any details.
          </p>

          {hasDeposit && (
            <div className="mb-6 sm:mb-8 p-4 rounded-xl sm:rounded-2xl bg-green-50 border border-green-200 space-y-1">
              <p className="text-sm font-medium text-green-800 font-sans">
                Deposit of ${depositAmount.toFixed(2)} received
              </p>
              <p className="text-xs text-green-700 font-sans">
                Remaining balance of ${balanceDue.toFixed(2)} due 7–14 days before your event.
              </p>
            </div>
          )}

          {!hasDeposit && <div className="mb-6 sm:mb-8" />}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleStartOver} variant="primary" className="w-full sm:w-auto">
              Order Another Cake
            </Button>
            <Button onClick={() => window.history.back()} variant="secondary" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Page Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink">Build Your Cake</h1>
          <p className="text-muted font-sans text-sm mt-1">
            Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].label}
          </p>
        </div>

        {/* Step indicator + Reset */}
        <div className="flex items-center gap-1.5 mb-4 sm:mb-8 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => {
                setDirection(i > currentStep ? 1 : -1)
                setCurrentStep(i)
              }}
              className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-all ${
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
            className="ml-auto flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-full text-xs font-medium font-sans whitespace-nowrap text-muted hover:text-ink hover:bg-cream transition-all flex-shrink-0"
            title="Reset all selections"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Mobile layout: compact preview → form → order summary */}
        <div className="lg:hidden space-y-4">
          {/* Compact live preview — always visible, 50% shorter */}
          <CakePreview />

          {/* Step content */}
          <div className="bg-white rounded-xl border border-ink/8 shadow-sm p-5 min-h-[320px] overflow-hidden">
            <motion.div
              key={currentStep}
              initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <StepComponent />
            </motion.div>
          </div>

          {/* Order summary at the bottom */}
          <OrderSummary />
        </div>

        {/* Desktop layout: form left, preview+summary right (sticky) */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8">
          {/* Form column (60%) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-ink/8 shadow-sm p-6 lg:p-8 min-h-[400px] overflow-hidden">
              <motion.div
                key={currentStep}
                initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <StepComponent />
              </motion.div>
            </div>
          </div>

          {/* Preview column (40%) — sticky */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <CakePreview />
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/95 backdrop-blur-sm border-t border-ink/8 px-4 py-3 z-30 safe-bottom">
        <div className="flex justify-between items-center gap-3 max-w-lg mx-auto">
          <Button
            variant="secondary"
            onClick={goBack}
            disabled={currentStep === 0}
            className="disabled:opacity-40 flex-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button variant="primary" onClick={goNext} className="flex-1">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="primary" onClick={handlePlaceOrder} className="flex-1">
              Place Order · ${totalPrice.toFixed(2)}
            </Button>
          )}
        </div>
      </div>

      {/* Desktop navigation (inline) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:w-[60%]">
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
              <Button variant="primary" onClick={handlePlaceOrder}>
                Place Order · ${totalPrice.toFixed(2)}
              </Button>
            )}
          </div>
        </div>
      </div>

      <OrderAgreementModal
        isOpen={showAgreement}
        onClose={() => setShowAgreement(false)}
        onConfirm={handleConfirmOrder}
      />

      <Toast
        message="Order placed! 🎂"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        variant="success"
      />
    </div>
  )
}
